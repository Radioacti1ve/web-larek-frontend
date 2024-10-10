import { ICard } from "../types";
import { Api } from "./base/api";

/* interface IAppApi {
  getCards(): Promise<ICard[]>
} */

export class AppApi extends Api /* implements IAppApi */ {
  constructor(baseUrl: string, options?: RequestInit) {
    super(baseUrl, options);
  }
}