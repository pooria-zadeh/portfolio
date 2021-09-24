import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <p>Hello World</p>
      <Image
        src="https://besthqwallpapers.com/Uploads/9-9-2018/65347/thumb2-emma-watson-british-actress-portrait-face-photoshoot.jpg"
        alt="emma watson"
        width="710"
        height="740"
      />
    </div>
  );
}
