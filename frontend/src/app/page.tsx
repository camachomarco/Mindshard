import { Div, PageContainer } from "@/lib/components/styles/ReusableStyledComponents";
import Image from "next/image";

export default function Home() {
  return (
    <PageContainer>
      <div>
        <h1>Mindshard</h1>

        <p>Turn any piece of data into a rich and insightful summary.</p>

        <p>Demo</p>
      </div>
      <div>
        <div>
          <p>Input</p>{" "}
          <div>
            <input type="text" placeholder="Enter text" />
            <p>or&nbsp;</p>
            <input type="file" />
          </div>
        </div>
      </div>

      <div>
        <div>output</div>
      </div>
    </PageContainer>
  );
}
