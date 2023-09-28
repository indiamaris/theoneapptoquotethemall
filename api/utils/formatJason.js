/** @format */

function FormatJason(jeison) {
	const raw = JSON.parse(jeison);
	const cleaned = raw.quotes;
	return cleaned;
}
module.exports.FormatJason = FormatJason;
