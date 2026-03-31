import { RedirectIfAuthed } from "@/components/auth/RedirectIfAuthed";
import { SignUpCard } from "@/components/ui/sign-up-card-2";

export default function SignupPage() {
  return (
    <RedirectIfAuthed>
      <SignUpCard />
    </RedirectIfAuthed>
  );
}
