import Container from "@/app/_components/container";
import { GITHUB_REPO_URL } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 dark:bg-slate-800">
      <Container>
        <div className="py-28 flex flex-col lg:flex-row items-center">
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
            <a
              href={`${GITHUB_REPO_URL}`}
              className="mx-3 font-bold hover:underline"
            >
              GitHub
            </a>
          </div>
          © 2025 Toru Nakamura
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
