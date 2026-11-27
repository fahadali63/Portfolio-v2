import { copy } from "@content/copy.ts";
import { engagements } from "@content/index.ts";
import { Block, TitleBlock } from "@/components/Sheet";

/** Selected engagements, client names withheld. A table: the value column is what a reader scans for. */
export function Engagements() {
  return (
    <>
      <TitleBlock
        code="B-03"
        track="business"
        title={copy.results.engagementsTitle}
        lead={<p>Enterprise and direct-client work I sourced, pitched and closed at Ideas Animation Studio. {copy.results.engagementsCaption}</p>}
        meta={[{ label: "Engagements", value: String(engagements.length) }]}
      />
      <Block id="wins" title="Wins" caption="Largest first" track="business">
        <ul className="deals">
          {engagements.map((e) => (
            <li key={e.slug} className="deal">
              <p className="deal__value">{e.value}</p>
              <div className="deal__main">
                <h3 className="deal__title">{e.title}</h3>
                <p className="meta">
                  {e.descriptor} · {e.terms}
                </p>
              </div>
              <p className="deal__how">{e.how}</p>
            </li>
          ))}
        </ul>
      </Block>
    </>
  );
}
