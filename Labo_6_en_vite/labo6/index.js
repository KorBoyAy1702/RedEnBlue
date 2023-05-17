import http from 'http';
import fs from 'fs';
const status = JSON.parse(fs.readFileSync("./status","utf-8"));
/*import { status } from './status.js';*/

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.method === 'GET') {
    if (req.url === '/red') {
      const response = status.red;
      res.end(JSON.stringify(response));
      return;
    }
    if (req.url === '/blue') {
      const response = status.blue;
      res.end(JSON.stringify(response));
      return;
    }  
    if (req.url === '/status') {
      res.end(JSON.stringify(status));
      return;
    }
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'page not found' }));
  }

  if (req.method === "PUT") {
    if (req.url === "/red") {
      try{
        status.red++;
        const updatedStatus = JSON.stringify(status);
        fs.writeFile('./status', updatedStatus, 'utf-8', (error) => {
          if(error){
            console.error("Error writing: " + error);
          }else{
            console.log("Successfully updated");
          }
        });
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(updatedStatus));
        return;
      }catch(error){
        consol.log(error);
      }
    }
    if (req.url === "/blue") {
      try{
        status.blue++;
        const updatedStatus = JSON.stringify(status);
        fs.writeFile('./status', updatedStatus, 'utf-8', (error) => {
          if(error){
            console.error("Error writing: " + error);
          }else{
            console.log("Successfully updated");
          }
        });
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(updatedStatus));
        return;
      }catch(error){
        consol.log(error);
      }
    }

    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "page not found" }));
    return;
  }

});

server.listen(3000, () => {
  console.log('Listening to request on http://localhost:3000/');
});

/* OPTIONS-methode:
De OPTIONS-methode is een HTTP-verzoekmethode die wordt gebruikt om informatie op te vragen 
over de communicatieopties die beschikbaar zijn voor een bepaalde URL of resource op een server. 
Wanneer een client een OPTIONS-verzoek naar een server stuurt, verwacht de client informatie te 
ontvangen over welke HTTP-methoden, headers en andere kenmerken zijn toegestaan voor de betreffende 
resource. Dit helpt de client om te begrijpen welke acties veilig kunnen worden uitgevoerd op de 
resource voordat daadwerkelijke verzoeken worden verzonden.

CORS (Cross-Origin Resource Sharing):
CORS is een mechanisme waarmee een webpagina in een webbrowser toestemming kan krijgen om resources 
aan te vragen van een andere domeinnaam dan de oorspronkelijke bron. Standaard staat moderne webbrowsers 
niet toe dat JavaScript-code AJAX-verzoeken (bijv. XMLHttpRequest of Fetch API) naar een ander domein 
stuurt dan waar de webpagina zelf wordt gehost. CORS definieert een set headers en serverzijde-instellingen 
waarmee een server kan aangeven welke externe bronnen toegang hebben tot de resources van de server. Dit 
helpt bij het waarborgen van de beveiliging van de client en het voorkomen van ongeoorloofde toegang tot gegevens.

De OPTIONS-methode wordt vaak gebruikt in combinatie met CORS. Wanneer een webbrowser een cross-origin AJAX-verzoek 
wil verzenden naar een server, zal de browser eerst een preflight-verzoek (OPTIONS-verzoek) verzenden om toestemming 
te vragen aan de server. De server reageert dan met de CORS-headers die aangeven of het verzoek vanuit de oorspronkelijke 
bron moet worden geaccepteerd of afgewezen. Als het verzoek wordt geaccepteerd, kan de webbrowser doorgaan met het 
verzenden van het daadwerkelijke verzoek (bijvoorbeeld een GET- of POST-verzoek) naar de server.*/