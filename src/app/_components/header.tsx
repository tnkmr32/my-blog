import { SITE_NAME } from "@/lib/constants";
import Link from "next/link";
import Container from "./container";

const Header = () => {
  return (
    <Container>
      <h2 className="text-2xl md:text-4xl font-semibold tracking-tight md:tracking-tighter leading-tight mb-8 mt-8 flex items-center">
        <Link href="/" className="hover:underline">
          {SITE_NAME}
        </Link>
      </h2>
    </Container>
  );
};

export default Header;
