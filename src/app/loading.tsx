"use client"
import { TailSpin } from "react-loader-spinner"
const loading = () => {
    return (
        <div className="h-[65vh] w-[100vw] flexCenter">
            <TailSpin
                height="80"
                width="80"
                color="#9747FF"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    )
}

export default loading