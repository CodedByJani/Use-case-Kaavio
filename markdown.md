# Käyttötapauskuvaukset: Äänestyssovellus

## 1. Selaa äänestyksiä

- **Käyttäjät:** Tavallinen käyttäjä  
- **Laukaisija:** Käyttäjä avaa sovelluksen etusivun  
- **Esiehto:** Käyttäjä on sovelluksessa  
- **Jälkiehto:** Käyttäjä näkee listan olemassa olevista äänestyksistä  
- **Käyttötapauksen kulku:**  
  1. Käyttäjä avaa sovelluksen  
  2. Sovellus hakee olemassa olevat äänestykset  
  3. Äänestykset listataan käyttäjälle  
- **Poikkeuksellinen toiminta:**  
  - Äänestyksiä ei ole saatavilla → Näytetään tyhjä lista ja ilmoitus "Ei äänestyksiä saatavilla"

---

## 2. Katso äänestystilanne

- **Käyttäjät:** Tavallinen käyttäjä  
- **Laukaisija:** Käyttäjä valitsee äänestyksen  
- **Esiehto:** Käyttäjä on valinnut äänestyksen  
- **Jälkiehto:** Käyttäjä näkee äänestyksen tämänhetkiset tulokset  
- **Käyttötapauksen kulku:**  
  1. Käyttäjä valitsee haluamansa äänestyksen  
  2. Sovellus hakee valitun äänestyksen tilanne- ja tulostiedot  
  3. Tulokset näytetään käyttäjälle  
- **Poikkeuksellinen toiminta:**  
  - Äänestystilannetta ei voida hakea → Näytetään virheilmoitus

---

## 3. Äänestä äänestystä

- **Käyttäjät:** Tavallinen käyttäjä  
- **Laukaisija:** Käyttäjä valitsee äänestyksen ja antaa äänensä  
- **Esiehto:** Käyttäjä on valinnut äänestyksen eikä ole vielä äänestänyt  
- **Jälkiehto:** Käyttäjän ääni on tallennettu  
- **Käyttötapauksen kulku:**  
  1. Käyttäjä valitsee äänestyksen  
  2. Käyttäjä valitsee haluamansa vaihtoehdon  
  3. Sovellus tallentaa äänen ja näyttää onnistumisilmoituksen  
- **Poikkeuksellinen toiminta:**  
  - Käyttäjä on jo äänestänyt → Näytetään ilmoitus "Olet jo äänestänyt"
  - Ääntä ei saada tallennettua → Näytetään virheilmoitus

---

## 4. Luo uusi äänestys

- **Käyttäjät:** Ylläpitäjä  
- **Laukaisija:** Ylläpitäjä valitsee "Luo uusi äänestys"  
- **Esiehto:** Ylläpitäjä on kirjautunut sisään  
- **Jälkiehto:** Uusi äänestys on tallennettu ja näkyy käyttäjille  
- **Käyttötapauksen kulku:**  
  1. Ylläpitäjä avaa uuden äänestyksen luontisivun  
  2. Ylläpitäjä syöttää otsikon, vaihtoehdot ja mahdolliset lisätiedot  
  3. Sovellus tallentaa uuden äänestyksen  
  4. Käyttäjät voivat nyt nähdä ja äänestää sitä  
- **Poikkeuksellinen toiminta:**  
  - Pakollisia tietoja puuttuu → Näytetään virheilmoitus "Täytä kaikki kentät"
  - Tallennus epäonnistuu → Näytetään virheilmoitus

---

## 5. Poista äänestys

- **Käyttäjät:** Ylläpitäjä  
- **Laukaisija:** Ylläpitäjä valitsee poistettavan äänestyksen  
- **Esiehto:** Ylläpitäjä on kirjautunut sisään ja valinnut äänestyksen  
- **Jälkiehto:** Äänestys on poistettu tietokannasta eikä enää näy käyttäjille  
- **Käyttötapauksen kulku:**  
  1. Ylläpitäjä selaa olemassa olevia äänestyksiä  
  2. Ylläpitäjä valitsee poistettavan äänestyksen  
  3. Sovellus pyytää varmistuksen  
  4. Ylläpitäjä vahvistaa poiston  
  5. Äänestys poistetaan tietokannasta  
- **Poikkeuksellinen toiminta:**  
  - Äänestystä ei löydy → Näytetään virheilmoitus  
  - Poisto epäonnistuu → Näytetään virheilmoitus