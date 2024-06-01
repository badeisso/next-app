"use client";
import { useRouter } from "next/navigation"
export default function Dashboard() {
    const router = useRouter();

    const handleClick = () => {
        router.push("/")
    }
    return (
        <>
            <button
                className=" w-fit rounded-md text-blue-300"
                onClick={handleClick}
            >
                Home
            </button>
            <h1>Dashboard</h1>
        </>

    )
}