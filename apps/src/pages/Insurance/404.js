import { ErrorBox, Header } from "components";
import { parse } from "query-string";

export default function Insurance404() {
  const parsed = parse(window.location.search);
  return (
    <div>
      <Header title="asdasdaskdiasjdasjdasuidasnm asodasjdjas asdiasdas" />
      <div className="text-center max-w-md mx-auto">
        <ErrorBox title="Oops!" subtitle={parsed.message || "Data not found"} />
      </div>
    </div>
  );
}
