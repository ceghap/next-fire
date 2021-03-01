import { UserContext } from "@/lib/context";
import { auth, googleAuthProvider, firestore } from "@/lib/firebase";
import { useContext, useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import debounce from "lodash.debounce";
import { Loader } from "@/components";

export default function EnterPage({}) {
  const { user, username } = useContext(UserContext);

  // 1. user signed out <SignInButton />
  // 2. user signed in, but missing username <UsernameForm />
  // 3. user signed in. has username <SignOutButton />
  return (
    <main className="mt-4">
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <SignOutButton />
        )
      ) : (
        <SignInButton />
      )}
    </main>
  );
}
// sign in with Google buggon
function SignInButton() {
  const signInWithGoogle = async () => {
    try {
      await auth.signInWithPopup(googleAuthProvider);
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <button
      className="bg-white text-gray-900 text-base font-semibold shadow-sm hover:shadow-md rounded-lg flex items-center px-4 py-2 border border-transparent hover:animate-ping "
      onClick={signInWithGoogle}
      type="button"
    >
      <FcGoogle className="mr-2 text-2xl" /> Sign in with Google
    </button>
  );
}

// sign out button
function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => auth.signOut()}
      className="bg-gray-200 text-gray-900 text-base font-semibold shadow-sm hover:shadow-md rounded-lg flex items-center px-4 py-2 border hover:animate-ping"
    >
      Sign out
    </button>
  );
}

function UsernameForm() {
  const [formValue, setFormValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username } = useContext(UserContext);

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  const onSubmit = async (e) => {
    e.preventDefault();

    // create ref for bith documents
    const userDoc = firestore.doc(`users/${user.uid}`);
    const usernameDoc = firestore.doc(`usernames/${formValue}`);

    // commit both docs together as a batch write
    try {
      const batch = firestore.batch();
      batch.set(userDoc, {
        username: formValue,
        photoURL: user.photoURL,
        displayName: user.displayName,
      });
      batch.set(usernameDoc, { uid: user.uid });

      await batch.commit();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const onChange = (e) => {
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const ref = firestore.doc(`usernames/${username}`);
        const { exists } = await ref.get();
        setIsValid(!exists);
        setLoading(false);
      }
    }, 500),
    []
  );

  return (
    !username && (
      <section>
        <label className="block text-gray-900 text-base font-semibold mb-4">
          Choose username
        </label>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            className="block sm:max-w-xs w-full px-4 py-3 text-base appearance-none border border-gray-300 shadow-none bg-white rounded-md placeholder-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
            value={formValue}
            onChange={onChange}
          />

          <UsernameMessage
            username={formValue}
            isValid={isValid}
            loading={loading}
          />

          <button
            type="submit"
            disabled={!isValid}
            className="disabled:bg-black bg-green-400 text-white px-4 py-2 font-semibold border border-transparent mt-4 rounded-md shadow-sm hover:shadow-md"
          >
            Choose
          </button>

          <p>Debug state</p>
          <div>
            Username : {formValue}
            <br />
            Loading: {loading.toString()}
            <br />
            Username valid: {isValid.toString()}
          </div>
        </form>
      </section>
    )
  );
}

function UsernameMessage({ username, isValid, loading }) {
  if (loading) {
    return <Loader show />;
  } else if (isValid) {
    return (
      <p className="text-base font-semibold text-green-500">
        {username} is available!
      </p>
    );
  } else if (username && !isValid) {
    return (
      <p className="text-base font-semibold text-red-500">
        {username} is taken!
      </p>
    );
  } else {
    return null;
  }
}
