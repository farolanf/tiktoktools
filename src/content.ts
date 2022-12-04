const btn = document.createElement("button");
btn.innerText = "Say it";
btn.style.position = "fixed";
btn.style.top = "0px";
btn.style.left = "0px";
btn.style.zIndex = "10000";
btn.onclick = function () {
  say("terima kasih");
};
document.body.prepend(btn);

function say(text: string) {
  chrome.runtime.sendMessage({ msg: "speech", text });
}
