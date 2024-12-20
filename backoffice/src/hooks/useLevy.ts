import { useState } from "react";
import { toast } from "react-toastify";
import type { StatusFilter } from "../app/dashboard/levy/components/FilterLevyStatus";
import LevyDetail from "../app/dashboard/levy/components/LevyDetail";
import type {
  DataDetailLevy,
  IBaseRequestParams,
  ILevyDetailResponse,
  ILevyListResponse,
  ILevyTotalTotal,
  LevyData,
  TotalDataLevy,
} from "../interfaces/levy.interface";
import { LevyService } from "../services/levy.service";

const levyService = new LevyService();

export const useLevy = () => {
  const [loading, setLoading] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);

  const [totalSummary, setTotalSummary] = useState<TotalDataLevy | null>(null);
  const [levyList, setLevyList] = useState<LevyData[] | null>(null);
  const [pageLevy, setPageLevy] = useState(1);
  const [limitLevy, setLimitLevy] = useState(10);
  const [totalLevy, setTotalLevy] = useState(0);
  const [selectedLevy, setSelectedLevy] = useState(0);
  const [levyDetail, setLevyDetail] = useState<DataDetailLevy | null>(null);
  const [levySortIsAscending, setlevySortIsAscending] = useState(true);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const [accountSelectedLevyFilter, setAccountSelectedLevyFilter] =
    useState<StatusFilter>({ id: 0, name: "" });

  const [levyInputValue, setLevyInputValue] = useState("");
  const [levySearchQuery, setLevySearchQuery] = useState("");
  const [levySelectedSort, setLevySelectedSort] = useState("");

  const fetchLevyList = async (): Promise<void> => {
    const params: IBaseRequestParams = {
      page: pageLevy ?? 1,
      limit: limitLevy,
      order: "DESC",
      search: levySearchQuery,
      filter: levySelectedSort,
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

  const getLevyList = async (params: IBaseRequestParams): Promise<void> => {
    setLoading(true);
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
      console.log("Detail", response);
      setLevyDetail(response.data);
      //   if (response) {
      //     toast.success("Levy details fetched successfully.");
      //   }
      return response;
    } catch (error) {
      const err = error as Error;
      console.log("errr", err);
      //   toast.error(err.message);
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
    levyDetail,
    levySearchQuery,
    levyInputValue,
    setLevyInputValue,
    setLevyDetail,
    setLimitLevy,
    setPageLevy,
    setLevyList,
    setTotalLevy,
    setSelectedLevy,
    fetchLevyList,
    fetchLevyDetail,
    fetchTotalLevy,
    levySortIsAscending,
    setlevySortIsAscending,
    setLevySearchQuery,
    levySelectedSort,
    getLevyList,
    setLevySelectedSort,
    loadingSearch,
    setLoadingSearch,
    accountSelectedLevyFilter,
    setAccountSelectedLevyFilter,
    showFilterModal,
    setShowFilterModal,
  };
};
