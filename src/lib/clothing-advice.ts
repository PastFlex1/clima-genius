type ClothingAdviceParams = {
  description: string;
  temperature: number;
  windSpeed: number;
};

type ClothingAdvice = {
  title: string;
  items: string[];
};

export const getClothingAdvice = ({
  description,
  temperature,
  windSpeed,
}: ClothingAdviceParams): ClothingAdvice => {
  const desc = description.toLowerCase();

  if (desc.includes("soleado") || desc.includes("despejado")) {
    if (temperature > 25) {
      return {
        title: "Soleado y Despejado",
        items: [
          "Camisetas de algodón, lino o telas que absorban la humedad.",
          "Colores claros para reflejar el sol.",
          "Sombrero de ala ancha, gorra y gafas de sol.",
          "Calzado abierto como sandalias o chanclas.",
        ],
      };
    }
    return {
      title: "Soleado y Despejado",
      items: [
        "Camiseta de manga corta o larga de tela ligera.",
        "Pantalones ligeros o jeans.",
        "Gafas de sol son una buena idea.",
        "Zapatillas o zapatos cómodos.",
      ],
    };
  }

  if (desc.includes("parcialmente nublado")) {
    return {
      title: "Parcialmente Nublado",
      items: [
        "Vístete en capas: una camiseta y una chaqueta ligera.",
        "Pantalones cómodos como jeans o chinos.",
        "Calzado cerrado pero ligero, como zapatillas.",
        "Lleva gafas de sol a mano.",
      ],
    };
  }

  if (desc.includes("nublado")) {
    return {
      title: "Nublado",
      items: [
        "Un suéter o chaqueta ligera es ideal.",
        "Camiseta de algodón debajo.",
        "Pantalones o jeans.",
        "Zapatos cerrados para mantener los pies abrigados.",
      ],
    };
  }

  if (
    desc.includes("lluvia") ||
    desc.includes("llovizna") ||
    desc.includes("chubascos") ||
    desc.includes("tormentas")
  ) {
    return {
      title: "Lluvioso",
      items: [
        "Chubasquero o paraguas resistente.",
        "Capas para el calor; la lluvia puede enfriar el ambiente.",
        "Calzado impermeable con suelas antideslizantes.",
        "Evita el algodón; opta por lana o sintéticos que sequen rápido.",
      ],
    };
  }

  if (windSpeed > 25) {
    return {
        title: "Ventoso",
        items: [
            "Chaqueta cortavientos es fundamental.",
            "Capas ajustadas para evitar que la ropa vuele.",
            "Si hace frío, un suéter debajo del cortavientos.",
            "Gorro o diadema para proteger las orejas.",
        ],
    };
  }

  if (desc.includes("niebla") || desc.includes("neblina")) {
     return {
        title: "Niebla / Neblina",
        items: [
            "Vístete en capas para el frío y la humedad.",
            "Tejidos que abriguen como lana o forro polar.",
            "Considera usar ropa con colores vivos para ser más visible.",
            "Calzado cerrado y cómodo.",
        ],
     };
  }

  // Asesoramiento por defecto para clima templado
  return {
    title: "Clima Templado",
    items: [
      "Camisa de manga larga o un suéter ligero.",
      "Jeans o pantalones casuales.",
      "Zapatillas son una excelente opción.",
      "Una chaqueta ligera por si refresca.",
    ],
  };
};
