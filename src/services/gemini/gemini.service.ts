import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { GeminiResponse } from 'src/shared/interfaces/geminiResponse';
import { MobilePhone } from 'src/modules/mobile-phone/entities/mobile-phone.entity';
import { generateDeviceSearchPrompt } from 'src/shared/functions/generatePrompts';
@Injectable()
export class GeminiService {
  private readonly API_URL =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
  private readonly API_KEY = process.env.GEMINI_API_KEY; //
  constructor(private readonly httpService: HttpService) {}

  async getResponse(text: string): Promise<GeminiResponse> {
    try {
      const query = generateDeviceSearchPrompt(text);

      const response = await firstValueFrom(
        this.httpService.post(
          `${this.API_URL}?key=${this.API_KEY}`,
          {
            contents: [
              {
                parts: [{ text: query }],
              },
            ],
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        ),
      );
      if (response.data) {
        return response.data as GeminiResponse;
      } else {
        throw new Error('Resposta da API Gemini inválida');
      }
    } catch (error) {
      throw new Error(`Erro ao buscar dados: ${error.message}`);
    }
  }

  async askAboutDevice(
    question: string,
    model: MobilePhone,
  ): Promise<GeminiResponse> {
    const query = `Você vai utilizar dados do device para responder a uma pergunta. Caso não consiga, não tem problema, responda apenas com "sinto-muito, não posso dar essa informação". A pergunta estará entre ################, responda apenas coisas pertinentes ao celular, nada além disso.
    DE MANEIRA ALGUMA PASSE O ID DO OBJETO CASO O USUÀRIO PEÇA.
    
    ${JSON.stringify(model)}
    ################
    PERGUNTA: 
    ${question}
    ################
    `;

    const response = await firstValueFrom(
      this.httpService.post(
        `${this.API_URL}?key=${this.API_KEY}`,
        {
          contents: [
            {
              parts: [{ text: query }],
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      ),
    );
    if (response.data) {
      return response.data as GeminiResponse;
    } else {
      throw new Error('Resposta da API Gemini inválida');
    }
  }
  async getDeviceData(model: MobilePhone): Promise<GeminiResponse> {
    const query = `Você vai utilizar dados do device para elencar informações pertinentes. Você deve retornar um json em string, retorne apenas o JSON, sem textos explicativos, toda sua resposta deve ser um JSON. Responda apenas coisas pertinentes ao celular, nada além disso.
    NÃO PASSE O ID, TAMBÉM NÃO PRECISA PASSAR O NOME DO MODELO, APENAS DADOS TÉCNICOS.
    
    DADOS: 
    ${JSON.stringify(model)}


    EXEMPLO DE RESPOSTA: 

    {
      Memória RAM: 16gb,
      Processador: Qualcomm XYZ,
      Tela: 60hz Oled Marca XYZ,
      ...
      }
      Envie informações mais user friendly possível.
    `;

    const response = await firstValueFrom(
      this.httpService.post(
        `${this.API_URL}?key=${this.API_KEY}`,
        {
          contents: [
            {
              parts: [{ text: query }],
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      ),
    );
    if (response.data) {
      return response.data as GeminiResponse;
    } else {
      throw new Error('Resposta da API Gemini inválida');
    }
  }
}
