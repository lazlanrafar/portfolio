import { FadeIn } from "@/components/atoms/fade-in";
import { getCodingActivity } from "@/actions/activity";

export default async function ActivityActivityPage() {
  const { data } = await getCodingActivity();

  const maxTotalSeconds = Math.max(
    ...data.map((entry) => entry.grandTotal.totalSeconds)
  );
  const minTotalSeconds = Math.min(
    ...data.map((entry) => entry.grandTotal.totalSeconds)
  );

  return (
    <FadeIn>
      <article className="p-5">
        <div className="md:space-y-2 mb-2.5 pb-2.5 border-b">
          <h1 className="md:text-2xl text-xl font-semibold">Weekly Activity</h1>
        </div>
        {data.reverse().map((item) => (
          <pre
            className="flex items-center justify-between"
            key={item.range.date}
          >
            <code className="text-muted-foreground w-40 truncate shrink-0 !text-sm">
              {item.range.text}
            </code>
            <div className="w-full h-1 bg-muted rounded md:block hidden">
              <div
                className="h-1 bg-foreground rounded"
                style={{
                  width: `${
                    ((item.grandTotal.totalSeconds - minTotalSeconds) /
                      (maxTotalSeconds - minTotalSeconds)) *
                    100
                  }%`,
                }}
              />
            </div>
            <code className="w-32 text-end text-muted-foreground ml-4 md:ml-0 shrink-0 !text-sm">
              {item.grandTotal.text}
            </code>
          </pre>
        ))}
      </article>
    </FadeIn>
  );
}
