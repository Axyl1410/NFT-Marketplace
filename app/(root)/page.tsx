import RoundedButton from "@/components/ui/rounded-button";
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <span className="fixed start-1/2 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-gradient-to-tl from-red-600/20 to-violet-600/20 blur-[200px] dark:from-red-600/40 dark:to-violet-600/40 ltr:-translate-x-1/2 rtl:translate-x-1/2"></span>

      <section className="relative flex min-h-[calc(100vh-66px)] items-center justify-center overflow-hidden">
        <div className="container">
          <div className="mt-10 grid grid-cols-1 justify-center text-center">
            <div className="relative">
              <div className="relative mb-5 text-gray-600 dark:text-text-dark">
                <h1 className="text-4xl font-bold leading-snug lg:text-6xl lg:leading-snug">
                  Tell the World <br /> About Your Collection{" "}
                  <span className="bg-gradient-to-l from-red-600 to-violet-600 bg-clip-text text-transparent">
                    Idea for NFTs!
                  </span>
                </h1>

                <div className="after:-z-1 overflow-hidden after:absolute after:-top-[50px] after:start-[30%] after:h-10 after:w-10 after:animate-[spin_10s_linear_infinite] after:rounded-lg after:bg-violet-600/10 after:content-[''] dark:after:bg-violet-600/30"></div>

                <div className="after:-z-1 overflow-hidden after:absolute after:bottom-[0] after:end-[15%] after:h-10 after:w-10 after:animate-ping after:rounded-full after:bg-violet-600/20 after:content-[''] dark:after:bg-violet-600/40"></div>
              </div>
              <p className="mx-auto max-w-xl text-lg text-slate-800 dark:text-text-dark">
                We are a huge marketplace dedicated to connecting great artists
                of all Giglink with their fans and unique token collectors!
              </p>

              <Link href={"/buy"}>
                <div className="my-8 flex justify-center">
                  <RoundedButton backgroundColor="#9022f2">
                    <p className="z-20">Explore now</p>
                  </RoundedButton>
                </div>
              </Link>
            </div>
          </div>

          <div className="-z-1 relative animate-[spin_30s_linear_infinite]">
            <span className="relative after:absolute after:bottom-1/2 after:start-0 after:z-10 after:h-2 after:w-8 after:translate-y-1/2 after:rounded-md after:bg-violet-600/20"></span>
            <span className="relative after:absolute after:bottom-1/2 after:start-0 after:z-10 after:h-2 after:w-8 after:translate-y-1/2 after:rotate-90 after:rounded-md after:bg-violet-600/20"></span>
          </div>
        </div>
      </section>
    </div>
  );
}
