import { RedirectIfAuthed } from "@/components/auth/RedirectIfAuthed";
import { SignInCard } from "@/components/ui/sign-in-card-2";

export default function LoginPage() {
  return (
    <RedirectIfAuthed>
      <SignInCard />
    </RedirectIfAuthed>
  );
}
