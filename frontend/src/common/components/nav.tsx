import Link from "next/link";

export const Nav = () => {
  return (
    <nav className="bg-white border-b justify-between flex p-5">
      <div>
        <Link className="font-semibold text-xl" href="/">Final Exam</Link>
      </div>
      <div>
        profile
      </div>
    </nav>
  );
};
