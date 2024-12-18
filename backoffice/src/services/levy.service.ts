import ApiService from "./api.service";
import type {
  IBaseRequestParams,
  ILevyDetailResponse,
  ILevyListResponse,
  ILevyResponse,
  ILevyServices,
  ILevyTotalTotal,
} from "../interfaces/levy.interface";

export class LevyService implements ILevyServices<ILevyResponse> {
  /**
   * Fetches the list of levies based on the provided parameters.
   * @param params - The parameters for filtering the levy list.
   * @returns A promise that resolves to the levy list or void in case of an error.
   */
  async getLevyList(
    params: IBaseRequestParams
  ): Promise<ILevyListResponse | void> {
    try {
      const response = await ApiService.fetchData<ILevyListResponse>({
        method: "GET",
        url: "/levy",
        params,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Fetches the details of a specific levy by ID.
   * @param id - The ID of the levy to fetch.
   * @returns A promise that resolves to the levy details or void in case of an error.
   */
  async getLevyDetail(id: string): Promise<ILevyDetailResponse | void> {
    try {
      const response = await ApiService.fetchData<ILevyDetailResponse>({
        method: "GET",
        url: `/levy/${id}`,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Fetches the total levy data.
   * @returns A promise that resolves to the total levy data.
   */
  async getTotalLevy(): Promise<ILevyTotalTotal> {
    try {
      const response = await ApiService.fetchData<ILevyTotalTotal>({
        method: "GET",
        url: "/levy/total",
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
