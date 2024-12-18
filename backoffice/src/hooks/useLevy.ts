import { useState } from "react";
import { toast } from "react-toastify";
import { LevyService } from "../services/levy.service";
import type {
  IBaseRequestParams,
  ILevyDetailResponse,
  ILevyListResponse,
  ILevyTotalTotal,
  LevyData,
  TotalDataLevy,
} from "../interfaces/levy.interface";

const levyService = new LevyService();

export const useLevy = () => {
  const [loading, setLoading] = useState(false);
  const [totalSummary, setTotalSummary] = useState<TotalDataLevy | null>(null);
  const [levyList, setLevyList] = useState<LevyData[] | null>(null);
  const [pageLevy, setPageLevy] = useState(1);
  const [limitLevy, setLimitLevy] = useState(10);
  const [totalLevy, setTotalLevy] = useState(0);
  const [selectedLevy, setSelectedLevy] = useState(0);

  const fetchLevyList = async (): Promise<void> => {
    const params: IBaseRequestParams = {
      page: pageLevy ?? 1,
      limit: limitLevy,
      order: "DESC",
      search: "",
      filter: "",
      sort: "",
    };
    // setLoading(true);
    try {
      const response = await levyService.getLevyList(params);
      console.log("response levy list", response.data.currentPage);
      setPageLevy(response.data.currentPage);
      setTotalLevy(response.data.total);
      setLevyList(response.data.datas);
      setLoading(false);
      //   return response;
    } catch (error) {
      const err = error as Error;
      //   toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchLevyDetail = async (
    id: string
  ): Promise<ILevyDetailResponse | void> => {
    setLoading(true);
    try {
      const response = await levyService.getLevyDetail(id);
      if (response) {
        toast.success("Levy details fetched successfully.");
      }
      return response;
    } catch (error) {
      const err = error as Error;
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchTotalLevy = async (): Promise<ILevyTotalTotal | void> => {
    setLoading(true);
    try {
      const response = await levyService.getTotalLevy();
      console.log("response total summary", response.data);
      setTotalSummary(response.data);

      //   if (response) {
      //     toast.success("Total levy data fetched successfully.");
      //   }
      return response;
    } catch (error) {
      const err = error as Error;
      //   toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    totalSummary,
    levyList,
    pageLevy,
    limitLevy,
    totalLevy,
    selectedLevy,
    setLimitLevy,
    setPageLevy,
    setLevyList,
    setTotalLevy,
    setSelectedLevy,
    fetchLevyList,
    fetchLevyDetail,
    fetchTotalLevy,
  };
};
