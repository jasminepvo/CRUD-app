// main.js
const deleteButton = document.querySelector("#delete-button");
const addInstances = document.querySelector(".selectionInstances");

deleteButton.addEventListener("click", (_) => {
	fetch("/options", {
		method: "delete",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({}),
	})
		.then((res) => {
			if (res.ok) return res.json();
		})
		.then((data) => {
			window.location.reload();
		});
});
