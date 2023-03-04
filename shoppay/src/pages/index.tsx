import Footer from "@/components/footer";
import Header from "@/components/header";
import Country from "@/types/country";

interface HomeProps {
  country: Country;
}

export default function Home({ country }: HomeProps) {
  return (
    <div>
      <Header country={country} />
      <Footer country={country} />
    </div>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      country: {
        name: "Thailand",
        flag: "https://cdn-icons-png.flaticon.com/512/197/197452.png?w=360",
      },
    }
  }
}
