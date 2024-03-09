import connectDB from "@/lib/dbConnect";
import url from "@/schema/url";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";

const post = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div>
      <Link href="/">
        <center>
          <button>Go back home</button>
        </center>
      </Link>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug: string = context.params?.slug?.toString()
    ? context.params?.slug?.toString()
    : "";

  await connectDB();

  const urlres = await url.findOne({ slug: slug }).exec();

  if (!urlres) {
    return {
      notFound: true,
    };
  }

  return {
    props: { urlres },
    redirect: {
      destination:
        urlres?.url.includes("http://") || urlres?.url.includes("https://")
          ? urlres?.url
          : "https://" + urlres?.url,
      permanent: false,
    },
  };
};

export default post;
