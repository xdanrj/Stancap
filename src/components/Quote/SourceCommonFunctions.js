export function sourceLogoSelector(source) {
    const imgPath = `../src/images/${source}.png`

    return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = imgPath

        img.onload = () => {
            resolve(imgPath)
        }
        img.onerror = () => {
            reject(false)
        }
    })
}

export const SourceNames = ['Anarco Feudalismo', 'Anarco Primitivismo', 'AnProm', 'Corujas Neto Lovers', 'Ditadura Cultural', 'Freudcap', 'Relatórios do Dmitri', 'Stancap', 'Stancap Nobreza']