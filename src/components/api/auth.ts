import { auth } from "./supabase";

const signin = async (email: string, password: string) => {
  const { data, error } = await auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
};

const signup = async (email: string, password: string) => {
  const { data, error } = await auth.signUp({
    email,
    password,
  });
  if (error) throw error;
  return data;
};

const logout = async () => {
  const { error } = await auth.signOut();
  if (error) throw error;
  return true;
};

export { signin, signup, logout };
