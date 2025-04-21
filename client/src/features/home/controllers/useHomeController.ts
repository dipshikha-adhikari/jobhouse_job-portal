import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { getAllJobs, getAllJobsCount, getTopCompanies } from "../api/home.api";
import { IJob, AppliedJobs } from '../../../types/postgres/types';
import useComponentsStore from "../../../store/components";
import { useAppliedJobs } from "../../jobseeker/api/getAppliedJobs";

export const useHomePageController = () => {
    const headerRef = useRef<HTMLDivElement>(null);
    const [headerHeight, setHeaderHeight] = useState(0);
    const [offset, setOffset] = useState(0);
    const limit = 6;

    const { isJobsFetched } = useComponentsStore();
    const { jobs: appliedJobs }: { jobs: AppliedJobs[] } = useAppliedJobs();

    const {
        data: jobs,
        isLoading,
        isError,
        error,
    } = useQuery<IJob[]>(["allJobs", offset], () => getAllJobs(limit, offset),);

    const {
        data: companies,
        isLoading: loadingCompanies,
        error: errorCompanies,
    } = useQuery("topComapnies", getTopCompanies)

    const { data: jobsCount } = useQuery(
        ["allJobsCount", offset],
        getAllJobsCount
    );

    useEffect(() => {
        if (headerRef.current) {
            setHeaderHeight(headerRef.current.offsetHeight);
        }
        window.scrollTo(0, 0);
    }, [headerRef]);

    return {
        jobs,
        jobsCount,
        isLoading,
        isError,
        error,
        appliedJobs,
        isJobsFetched,
        offset,
        setOffset,
        limit,
        headerRef,
        headerHeight,
        companies,
        loadingCompanies,
        errorCompanies,
    };
};
