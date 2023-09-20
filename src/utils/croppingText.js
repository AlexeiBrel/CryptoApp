export default function croppingText(text) {
    return text.length > 100 ? `${text.slice(0, 100)} ...` : text
}