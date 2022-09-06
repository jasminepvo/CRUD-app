// main.js
const update = document.querySelector("#update-button");

update.addEventListener("click", (_) => {
	// Send PUT Request here
	fetch("/quotes", {
		method: "put",
		//tell the server we're sending JSON data by setting the content-type
		headers: { "Content-Type": "application/json" },
		//convert the data we send into JSON
		body: JSON.stringify({
			name: "Darth Vader",
			quote: "I find your lack of faith disturbing.",
		}),
	})
		.then((res) => {
			if (res.ok) return res.json();
		})
		.then((response) => {
			window.location.reload(true);
		});
});
