import { Injectable } from '@angular/core';
import moment from 'moment';

const LOCAL_STORAGE_DATA_KEY = "MIAUCL_GUESTBOOK";

type LocalStorageData = { timestamp: string, name: string, pin: string, token: string, entries: string[] }


@Injectable(
{
  providedIn: 'root',
})
export class LocalStorageService
{
  /** Data */
  data: LocalStorageData;


  constructor()
  {
    const stored = localStorage.getItem(LOCAL_STORAGE_DATA_KEY);

    try
    {
      if (stored === null)
      {
        console.info("No stored data has been found. This happens when the guestbook launches the first time or the cache has been cleared.");
        throw new Error("No Data Found!");
      }
      this.data = <LocalStorageData>JSON.parse(stored);

      console.info("Retrieved data from local storage");
    }
    catch (e)
    {
      console.warn((e as Error).message);
      console.info("Initialize with empty data object");

      const name = prompt("Give your guestbook a name!", '');
      const pin = prompt("Set an admin PIN for your guestbook!", '1234');
      const token = prompt(`Enter your dropbox token! Where do I get it from?
      - https://dropbox.tech/developers/generate-an-access-token-for-your-own-account
      - https://developers.dropbox.com/de-de/oauth-guide`, '');


      this.data = { timestamp: moment().format(), name: name as string, pin: pin as string, token: token as string, entries: [] };
    }

    // Make the data available in the cli
    (window as unknown as { data: unknown }).data = this.data;

    this.save()
  }




  /**
   * Clear data
   */
  clear(): void
  {
    if (confirm("Are you sure you want to clear the guestbook? It cannot be recovered again!"))
    {
      localStorage.clear();

      window.location.reload();
    }
  }


  /**
   * Save data
   *
   * @sync
   */
  save(): void
  {
    let s, l, overflow;

    s = JSON.stringify(this.data);
    l = new TextEncoder().encode(s).length;
    overflow = l > 5 * 1024 * 1024;

    // Restrict files larger than 5MB and pop last file
    if (overflow)
    {
      return alert(`5MB limit exceeded (${ l }B)!`);
    }

    try
    {
      localStorage.setItem(LOCAL_STORAGE_DATA_KEY, s);

      console.info(`Data saved (${ l }B)`);
    }
    catch (e)
    {
      console.info("Could not save data to local storage");

      throw e;
    }
  }
}
