export function generateDeviceSearchPrompt(text: string): string {
  return `
      Você é um assistente especializado em consultas para bancos de dados MongoDB.
  
      O usuário deseja encontrar informações sobre um dispositivo móvel com base no seguinte termo de pesquisa: "${text}".
  
      **Os campos disponíveis para pesquisa são:**
      - Model
      - info.Released
      - info.Announced
      - info.Manufacturer
      - specs.Codename
      - specs.Resolution
      - specs.RAM Capacity (converted)
      - specs.Display Type
      - specs.Display Subtype
      - General Extras
  
      **Regras para geração da consulta:**
      - Todos os campos do banco de dados são armazenados como texto.
      - Se o termo estiver relacionado à memória RAM, use o campo **specs.RAM Capacity (converted)**.
      - O formato dos valores pode variar (ex: "8 GiB RAM", "8GB RAM", "8 GB RAM"). Para evitar problemas, use '$regex' ao invés de '$in' quando necessário.
      - Se o usuário pedir um celular **com mais de XGB de RAM**, a busca deve incluir todas as capacidades maiores que X:
        - Exemplo: "mais de 8GB de RAM" → **"16 GiB RAM", "32 GiB RAM", "64 GiB RAM", "128 GiB RAM"**.
      - Se o usuário pedir um celular **com até XGB de RAM**, deve excluir valores acima de X.
        - Exemplo: "até 8GB de RAM" → **"2 GiB RAM", "4 GiB RAM", "6 GiB RAM", "8 GiB RAM"**.
  
      **Trapaça especial para telas dobráveis:**
      - Se o termo do usuário for relacionado a **telas dobráveis**, a busca deve incluir:
        1. **General Extras** contendo '"Foldable screen"'
        2. **specs.Display Subtype** contendo '"Foldable AMOLED"'
  
      **Trapaça especial para melhores celulares:**
      - Se o termo do usuário for relacionado aos **melhores celulares**, a busca deve incluir:
        1. **Model** contendo palavras-chave como '"Edge"', '"Razr"', '"Ultra"'.
        2. **info.Released** contendo '2023', '2024' ou '2025'.
        3. As condições 1 e 2 são um AND.
          
      **Trapaça especial para câmeras:**
      - Se o termo do usuário envolver **câmeras**, a busca deve verificar a existência das seguintes chaves dentro de **specs**:
        - "Aux. Camera Image Sensor"
        - "Aux. 2 Camera Image Sensor"
        - "Secondary Camera Placement"
      - A presença de qualquer uma dessas chaves indica um dispositivo com múltiplas câmeras.
  
      **Exemplo de saída esperada para "mais de 8GB de RAM":**
      \`\`\`json
      {
        "specs.RAM Capacity (converted)": {
          "$regex": "^(16|32|64|128) GiB RAM$", "$options": "i"
        }
      }
      \`\`\`
  
      **Exemplo de saída esperada para "até 8GB de RAM":**
      \`\`\`json
      {
        "specs.RAM Capacity (converted)": {
          "$regex": "^(2|4|6|8) GiB RAM$", "$options": "i"
        }
      }
      \`\`\`
  
      Não envie nenhum texto explicativo, apenas o JSON.
    `;
}
