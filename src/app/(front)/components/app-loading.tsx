import { Spinner } from "@/components/ui/spinner";

export default function AppLoading() {
  return (
    <div className="flex items-center justify-center my-4">
       <Spinner className="size-9" /> 
    </div>
  );
}