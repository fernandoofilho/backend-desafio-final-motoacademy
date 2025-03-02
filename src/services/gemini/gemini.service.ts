import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { GeminiResponse } from 'src/interfaces/geminiResponse';

@Injectable()
export class GeminiService {
  private readonly API_URL =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
  private readonly API_KEY = process.env.GEMINI_API_KEY; //
  constructor(private readonly httpService: HttpService) {}

  async getResponse(text: string): Promise<GeminiResponse> {
    try {
      const query = `Faça um objeto de query para minha base Mongo DB com base no texto, a query deve ser de busca, os campos que você tem disponível para pesquisar são Model, info.Released, info.Announced, info.Manufacturer, specs.Codename, specs.Resolution, specs.RAM Capacity (converted). 
      Tome este objeto como exemplo.
      
      MANDE APENAS O OBJETO DA PESQUISA, EM FORMATO DE OBJETO { } 


      OBJECT: 
      ObjectId
      Model
      RAZR 50 Ultra 5G 5th gen 2024 Premium Edition TD-LTE JP 256GB XT2451-6

      String
      Added
      2024-12-22 18:52

      String

      info
      Object

      Object

      specs
      Object

      Object
      Brand
      Motorola

      String
      Model
      RAZR 50 Ultra 5G 5th gen 2024 Premium Edition TD-LTE JP 256GB XT2451-6

      String
      Codename
      Motorola ArcFox

      String
      General Extras
      Haptic touch feedback,Tactile touch feedback,Foldable screen

      String
      Device Category
      Smartphone

      String
      Width
      73.99 mm

      String
      Height
      171.42 mm

      String
      Depth
      7.09 mm

      String
      Dimensions
      2.91x6.75x0.28 inches

      String
      Mass
      189 g

      String
      JPY

      String
      Platform
      Android

      String
      Operating System
      Google Android 14 (Upside Down Cake)

      String
      Software Extras
      Voice Command,Navigation software,Intelligent personal assistant,Voice Recognition,Face Recognition

      String
      CPU Clock
      3010 MHz

      String
      CPU
      Qualcomm Snapdragon 8s Gen 3 SM8635, 2024, 64 bit, octa-core, 4 nm, Qualcomm Adreno 735 GPU

      String
      RAM Type
      LPDDR5X SDRAM

      String
      RAM Capacity (converted)
      12 GiB RAM

      String
      Non-volatile Memory Interface
      UFS 4.0

      String
      Non-volatile Memory Capacity (converted)
      256 GB ROM

      String
      Display Hole
      1-hole

      String
      Display Diagonal
      175.3 mm

      String
      Resolution
      1080x2640

      String
      Horizontal Full Bezel Width
      7.62 mm

      String
      Display Area Utilization
      84.9%

      String
      Pixel Density
      413 PPI

      String
      Display Type
      AM-OLEDdisplay

      String
      Display Subtype
      Foldable AMOLED

      String
      Number of Display Scales
      1073.7M

      String
      Display Refresh Rate
      165 Hz

      String
      Scratch Resistant Screen
      No

      String
      Secondary Display Diagonal:
      101 mm

      String
      Secondary Display Resolution
      1272x1080

      String
      Secondary Display Pixel Density (dot pitch):
      420 PPI

      String
      Secondary Display Type:
      AM-OLED2nd display

      String
      Secondary Number of Display Colors/Scales:
      1073.7M

      String
      Scratch Resistant Sec. Screen:
      Gorilla Glass Victus

      String
      Secondary Display Refresh Rate
      120 Hz

      String
      Graphical Controller
      Qualcomm Adreno 735

      String
      A/V Out
      No

      String
      Microphone(s)
      3

      String
      Loudspeaker(s):
      stereo

      String
      Audio Output:
      USB Type-C

      String
      Supported Cellular Bands
      GSM850,GSM900,GSM1800,GSM1900,UMTS2100 (B1),UMTS1900 (B2),UMTS850 (B5),UMTS900 (B8),LTE2100 (B1),LTE1900 (B2),LTE1800 (B3),LTE1700/2100 (B4),LTE850 (B5),LTE2600 (B7),LTE900 (B8),LTE1500 (B11),LTE700 (B12),LTE700 (B17),LTE800 (B18),LTE800 (B19),LTE850 (B26),LTE700 (B28),TD-LTE2600 (B38),TD-LTE1900 (B39),TD-LTE2300 (B40),TD-LTE2500 (B41),TD-LTE3500 (B42),LTE1700/2100 (B66),LTE600 (B71),NR2100 (N1),NR1800 (N3),NR700 (N28),TD-NR2500 (N41),TD-NR3700 (N77),TD-NR3500 (N78)bands

      String
      Supported Cellular Data Links
      GPRS,GPRS C12,EDGE,EDGE MSC12,UMTS,HSUPA,HSUPA 5.8,HSDPA,HSPA+ 21.1,HSPA+ 42.2,DC-HSDPA 42.2,LTE,LTE 100/50,LTE 150/50,LTE 225/50,LTE 300/50,LTE 300/75,LTE 300/100,LTE 400/150,LTE 450/50,LTE 450/100,LTE 600/50,LTE 600/100,LTE 1000/100,NR 1500,NR 2600data links

      String
      SIM Card Slot
      e-SIM

      String
      Complementary Phone Services
      Voice transmission,Voice speaker,Vibrate,Speakerphone,ANC,HD Voice,VoLTE

      String
      Dual Cellular Network Operation
      Dual standby

      String
      Sec. Supported Cellular Networks:
      GSM850, GSM900, GSM1800, GSM1900, UMTS2100 (B1), UMTS1900 (B2), UMTS1700/2100 (B4), UMTS850 (B5), UMTS900 (B8), LTE2100 (B1), LTE1900 (B2), LTE1800 (B3), LTE1700/2100 (B4), LTE850 (B5), LTE2600 (B7), LTE900 (B8), LTE1500 (B11), LTE700 (B12), LTE700 (B17), LTE800 (B18), LTE800 (B19), LTE850 (B26), LTE700 (B28), TD-LTE2600 (B38), TD-LTE1900 (B39), TD-LTE2300 (B40), TD-LTE2500 (B41), TD-LTE3500 (B42), NR2100 (N1), NR1800 (N3), NR700 (N28), TD-NR2500 (N41), TD-NR3700 (N77), TD-NR3500 (N78)

      String
      Sec. Supported Cellular Data Links:
      GPRS, GPRS C12
      , EDGE, EDGE MSC12
      , UMTS, HSUPA, HSUPA 5.8
      , HSDPA, HSPA+ 21.1
      , HSPA+ 42.2, DC-HSDPA 42.2, LTE, LTE 100/50, LTE 150/50, LTE 225/50, LTE 300/50, LTE 300/75, LTE 300/100, LTE 400/150, LTE 450/50, LTE 450/100, LTE 600/50, LTE 600/100, LTE 1000/100, NR 1500, NR 2600

      String
      Sec. SIM Card Slot
      Nano-SIM (4FF)

      String
      Touchscreen Type
      Capacitive multi-touchscreen

      String
      Expansion Interfaces
      No

      String
      USB
      USB 2.0

      String
      USB Services
      USB charging,USB fast charging,USB Host,USB OTG 1.3,USB PD,USB PD 2.0,USB PD 3.0

      String
      USB Connector
      USB C reversible

      String
      Max. Charging Power
      68.0 W

      String
      Bluetooth
      Bluetooth 5.4

      String
      Wireless LAN
      802.11a,802.11b,802.11g,802.11n,802.11ac,802.11ax,802.11be

      String
      Wireless Services
      Miracast,Wi-Fi Direct,Wi-Fi Tethering,Wi-Fi Calling

      String
      NFC
      NFC A,NFC B

      String
      FM Radio Receiver
      No

      String
      Complementary Satellite Services
      Simultaneous GPS,A-GPS,Dual-frequency GPS,Geotagging,QuickGPS,QZSS

      String
      Supported GLONASS protocol(s)
      L1OF

      String
      Supported Galileo service(s)
      E1,E5a

      String
      Supported BeiDou system (BDS)
      B1c,B1I,B2aBeiDou receiver

      String
      Camera Placement
      Rear

      String
      Camera Image Sensor
      BSI CMOS

      String
      Image Sensor Pixel Size
      0.80 micrometer

      String
      Number of effective pixels
      50.1 MP camera

      String
      Aperture (W)
      f/1.80

      String
      Zoom
      2.0 x optical zoom

      String
      Focus
      PD AF

      String
      Min. Equiv. Focal Length
      24 mm

      String
      Video Recording
      3840x2160 pixel

      String
      Flash
      single LED

      String
      Camera Extra Functions
      EIS,EIS (video),OIS,OIS (video),HDR photo,HDR video,Red-eye reduction,Slow motion video,Burst mode,Refocus,Touch focus,Panorama Photo,Face detection,Face tagging,Smile detection,Face retouch,Face retouch (video),Intelligent scene detection

      String
      Aux. Camera Image Sensor
      BSI CMOS

      String
      Aux. Cam. Image Sensor Pixel Size
      0.64 micrometer

      String
      Aux. Camera Number of Pixels
      50.1 MP aux. cam

      String
      Aux. Camera Aperture (W)
      f/2.00

      String
      Aux. Camera Focus
      PD AF

      String
      Aux. Camera Extra Functions
      Pixel unification,HDR photo,Burst mode,Touch focus,Macro mode,Panorama Photo,Face detection,Face tagging,Smile detection,Face retouch,Face retouch (video),Intelligent scene detection

      String
      Aux. 2 Camera Image Sensor
      No

      String
      Aux. 3 Camera Image Sensor
      No

      String
      Aux. 4 Camera Image Sensor
      No

      String
      Secondary Camera Placement
      Front

      String
      Secondary Camera Sensor
      BSI CMOS

      String
      Secondary Camera Number of pixels
      32.0 MP sec. cam

      String
      Secondary Aperture (W)
      f/2.40

      String
      Secondary Video Recording
      3840x2160 pixel

      String
      Secondary Camera Extra Functions
      Pixel unification,HDR photo,Burst mode,Panorama Photo,Face detection,Face tagging,Smile detection,Face retouch,Intelligent scene detection

      String
      Sec. Aux. Cam. Image Sensor
      No

      String
      Built-in compass
      Yes

      String
      Built-in accelerometer
      3Daccelerometer

      String
      Built-in gyroscope
      Yes

      String
      Additional sensors
      FP sensor,Hall,L sensor,P sensor

      String
      Protection from solid materials
      Yes

      String
      Protection from liquids
      8 Protected against immersion beyond 1m of depth

      String
      Immersion into liquids (depth limit)
      150 cm

      String
      Immersion into liquids time limit
      30 min

      String
      Battery
      Li-ion

      String
      Battery Cells in Parallel
      Yes

      String
      Nominal Battery Capacity
      4000 mAh battery

      String
      Wireless Charging
      Qi

      String
      Max. Wireless Charging Power
      15.0 W

      faça a query para o seguinte prompt, que está entre ###################:
      ###################
      ${text}
      ###################

      leve em consideração que o objeto que você deve retornar deve servir para o typeorm.
      
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
    } catch (error) {
      throw new Error(`Erro ao buscar dados: ${error.message}`);
    }
  }
}
