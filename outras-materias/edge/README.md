# Projeto IoT: "Passa a Bola"

<img width="524" height="1036" alt="sensor-passa-bola" src="https://github.com/user-attachments/assets/d40c4485-0dd6-4e59-94ff-bba3ade8c753" />

## Equipe

* Luara Ramos - rm565573  
* Jean Feltran - rm566534  
* Kaio Galvão - rm566536  

## Descrição do Projeto

Este projeto corresponde à **Sprint 4** do desafio "Passa a Bola", com foco na **aplicação prática da arquitetura IoT e Edge Computing**. Nosso objetivo é demonstrar a comunicação em tempo real entre dispositivos IoT e uma plataforma, utilizando sensores para monitorar condições ambientais de um campo de futebol, como **temperatura, umidade, vento e chuva**.  

A solução coleta dados na **borda (edge)** com um microcontrolador ESP32, envia essas informações via MQTT para uma plataforma de visualização, permitindo **decisões em tempo real** sobre o uso seguro do campo.

[📌 Projeto no Wokwi](https://wokwi.com/projects/446988294338697217)  
[🎥 Vídeo demonstrativo](COLE_AQUI_O_LINK_DO_VIDEO)

## Arquitetura Proposta

A arquitetura do projeto é dividida em **três camadas principais**:

* **Camada de Dispositivos (Edge):**  
  - Microcontrolador **ESP32** com sensores ambientais: DHT22 (temperatura e umidade), sensor de chuva e sensor de vento.  
  - Exibição de dados em **LCD I2C 20x4**.  
  - Lógica inicial de decisão executada localmente (ex.: campo seguro ou molhado).

* **Camada de Processamento / Middleware:**  
  - Utilizamos **Node-RED** para processar os dados recebidos dos sensores via **MQTT**.  
  - Publicação e subscrição de tópicos, transformações e preparação dos dados para visualização.  

* **Camada de Aplicação:**  
  - Dashboard em tempo real para exibição das condições do campo.  
  - Alertas inteligentes para gestores, garantindo segurança e eficiência na gestão do espaço.

## Recursos Necessários

### Hardware

* **Microcontrolador:** ESP32  
* **Sensores:**  
  - DHT22 (temperatura e umidade)  
  - Sensor de chuva  
  - Sensor de vento  
* **Exibição:** LCD I2C 20x4  
* **Placa de desenvolvimento e cabos**  

### Software

* **Arduino IDE**  
* Bibliotecas Arduino: `Wire.h`, `LiquidCrystal_I2C.h`, `DHT.h`  
* **Node-RED** para integração e processamento MQTT  
* **MQTT Broker** (local ou nuvem)  

## Instruções de Uso

### 1. Configuração do ESP32 na Arduino IDE

1. Abra a Arduino IDE e vá em **`Arquivo > Preferências`**.  
2. No campo "URLs Adicionais para Gerenciadores de Placas", cole:  
https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json

3. Vá em **`Ferramentas > Placa > Gerenciador de Placas...`**, procure por `esp32` e clique em **Instalar**.  

### 2. Upload do Código para o Dispositivo

1. Abra o código-fonte (`.ino`) na Arduino IDE.  
2. Selecione a placa ESP32 correta em **`Ferramentas > Placa`**.  
3. Conecte o ESP32 ao computador via USB.  
4. Clique em **Upload**.

### 3. Execução

1. O ESP32 iniciará a leitura dos sensores e exibirá os dados no display LCD.  
2. Os dados são enviados em tempo real via **MQTT** para o Node-RED, que processa e publica no dashboard.  
3. O campo será indicado como seguro ou molhado com ícones específicos: ⚽ (bom) ou 🌧️ (molhado).


## Resultados da Prova de Conceito (PoC)

* Comunicação em tempo real confirmada entre ESP32 e Node-RED via MQTT.  
* Visualização das condições ambientais do campo em dashboard.  
* Alertas inteligentes funcionando conforme critérios definidos na borda (Edge).  
* Prints de integração disponíveis na pasta `assets/`.


