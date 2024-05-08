import { test } from "quatsch";

export async function getDataFromBackend() {
    const rest = await fetch("http://localhost:8080/test", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }).then((res) => res.json())
    console.log(rest);
}

export async function postDataToBackend() {
    const rest = await fetch("http://localhost:8080/testPOST", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            testProperty: "testValue"
        })
    });
    console.log(rest);
}