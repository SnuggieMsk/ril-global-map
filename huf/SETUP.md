# HUF Suitability Questionnaire — Backend Setup

Connect the HTML questionnaire to a Google Sheet so every client submission is logged automatically. **No server, no paid services, no API keys required.** The setup is one-time and takes about 5–10 minutes.

---

## What you have

| File | What it is |
|---|---|
| `huf-personal-suitability.html` | The client-facing questionnaire |
| `apps-script-backend.gs` | The backend script (paste into Google Apps Script) |
| `huf-sheet-headers.csv` | Column headers for the Sheet |

---

## How it works

1. The client fills the questionnaire in their browser
2. On the final step, the form sends the answers to a Google Apps Script web app
3. The web app appends a row to your Google Sheet
4. You see every submission timestamped in the Sheet

The Google Sheet itself cannot receive web data — Apps Script is the bridge that gives it an internet-accessible endpoint.

---

## Step 1 — Prepare the Google Sheet

1. Open the target Sheet (or create a new one in Google Drive)
2. **File → Import → Upload** → drag in `huf-sheet-headers.csv`
3. Import location: **Replace current sheet** · Separator type: **Detect automatically**
4. Click **Import**

The Sheet should now have 30 column headers in row 1, starting with `Timestamp` and ending with `Notes`.

> **Alternative:** Click cell A1 and paste the headers as a single tab-separated row (see the CSV file contents).

---

## Step 2 — Add the Apps Script backend

1. From the Sheet, go to **Extensions → Apps Script**
2. Delete the placeholder `function myFunction() { }` code
3. Open `apps-script-backend.gs` and copy all its contents
4. Paste into the Apps Script editor
5. Save with **Ctrl+S** (or **Cmd+S** on Mac)
6. Give the project a name when prompted (e.g. *HUF Backend*)

---

## Step 3 — Deploy the script as a web app

1. In the Apps Script editor, click **Deploy → New deployment**
2. Click the **gear icon** next to "Select type" → choose **Web app**
3. Configure:
   - **Description:** `HUF submission endpoint` (optional)
   - **Execute as:** *Me*
   - **Who has access:** *Anyone*
4. Click **Deploy**

### Authorisation prompt

The first deployment will ask for permissions:

1. Click **Authorise access**
2. Choose your Google account
3. You'll see a screen saying *"Google hasn't verified this app"* — this is **expected and safe** because you're authorising your own script
4. Click **Advanced** → **Go to [project name] (unsafe)**
5. Click **Allow**

### Copy the Web App URL

After deployment completes, you'll see a **Web app URL** ending in `/exec`. It looks like:

```
https://script.google.com/macros/s/AKfycb...long-string.../exec
```

**Copy this URL.** You'll need it in the next step.

---

## Step 4 — Connect the HTML to the backend

1. Open `huf-personal-suitability.html` in any text editor
2. Search for this line:

   ```javascript
   const BACKEND_URL = 'PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE';
   ```

3. Replace the placeholder string with the URL you copied in Step 3:

   ```javascript
   const BACKEND_URL = 'https://script.google.com/macros/s/AKfycb.../exec';
   ```

4. Save the file

---

## Step 5 — Test it

1. Open `huf-personal-suitability.html` in a browser
2. Fill the questionnaire end-to-end with test data
3. On the summary screen, look for the small line under the verdict:
   - *"Saving your responses..."* → *"Your responses have been saved"* (green)
4. Check the Google Sheet — a new row should appear within a few seconds

If the row doesn't appear, see the troubleshooting section below.

---

## What gets captured

Each submission writes one row to the Sheet with:

- **Identity:** Name, Email, Phone, City, Age
- **Family context:** Marital, Children, Coparceners, Ancestral
- **Financial profile:** Income, Income Sources, Regime, Deduction Level
- **Objectives:** Goal, Privacy, Horizon
- **Assets:** Corpus Source, Corpus Size, Properties, HUF Property, Investments
- **Awareness:** Aware Rights, Aware Clubbing, Aware 87A
- **Considerations:** Compliance, Partition
- **Computed output:** Verdict, Suggested Regime
- **Free text:** Notes
- **Server-side:** Timestamp

---

## Troubleshooting

**No rows appearing in the Sheet**

- Confirm the URL in the HTML ends in `/exec`, not `/dev`
- Confirm the deployment is **Anyone**, not *Anyone with Google account*
- Open the Sheet's **Extensions → Apps Script → Executions** tab to see if the script ran and what error (if any) was raised

**"Your responses have been saved" appears but no row is added**

- The browser uses `no-cors` mode, which means it can't read the response. The success message is optimistic
- Verify by checking the **Executions** log in Apps Script — that shows the real outcome

**Changed the script and nothing happened**

- Apps Script does not auto-redeploy. After editing the code, go to **Deploy → Manage deployments** → click the pencil icon on the active deployment → **Version: New version** → Deploy. The URL stays the same.

**Want to change the Sheet tab name**

- In `apps-script-backend.gs`, change the `SHEET_NAME` constant on line 5 to match your tab name

---

## Optional enhancements

**Email notification on each submission** — add this line inside `doPost`, just before `sheet.appendRow(row)`:

```javascript
MailApp.sendEmail('you@example.com', 'New HUF submission', JSON.stringify(data, null, 2));
```

You can also add a confirmation card that replaces the summary view after a successful submission, or auto-email the client a copy of their summary. Both are small additions to the existing script — ask if you'd like them.

---

## Costs

Everything in this setup is on Google's free tier:

- **Sheets:** unlimited rows up to 10 million cells per spreadsheet
- **Apps Script:** 20,000 web app calls per day for free Google accounts (90,000 for Workspace)
- **No domain, no hosting required** — the HTML can be opened locally, shared as a file, or hosted on GitHub Pages, Netlify, Vercel, etc., all free

There are no recurring charges and no credit card requirement at any stage.
