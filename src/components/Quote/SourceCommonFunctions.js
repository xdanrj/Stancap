export const SourceNames = ['Anarco Feudalismo', 'Anarco Primitivismo', 'AnProm', 'Corujas Neto Lovers', 'Ditadura Cultural', 'Freudcap', 'Relatórios do Dmitri', 'Stancap', 'Stancap Nobreza']
export async function sourceLogoSelector(source) {
    if (SourceNames.includes(source)) {
      return {"path": `/images/${source}.png`, "source": source}
    } else {
        return false
    }
}

