import { Skeleton } from "@/components/ui/skeleton";


const Loading = () => {
    return (
        <div className="w-full h-full p-8">
            <Skeleton className="w-full aspect-square rounded-xl md:aspect-[2.4/1]" />
        </div>
    );
}

export default Loading;