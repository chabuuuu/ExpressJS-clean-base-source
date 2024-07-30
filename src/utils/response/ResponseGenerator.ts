import { RequestPageable } from "@/dto/request/RequestPagable.dto";
import { BaseResponse } from "@/dto/response/BaseResponse.dto";
import { PagingResponse } from "@/dto/response/PagingResponse.dto";
import { Page } from "@/types/Page.type";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

class ResponseGenerator<T> {
    /**
     ** Format the success response of create operation 
     * @param data 
     * @returns 
     */
    public createSuccessResponse(data: T) : BaseResponse<T> {
        return new BaseResponse(StatusCodes.CREATED, ReasonPhrases.CREATED, null, data);
    }

    /**
     ** Format the success response of find many operation 
     * @param data 
     * @returns 
     */
    public findManySuccessResponse(data: T) : BaseResponse<T> {
        return new BaseResponse(StatusCodes.OK, ReasonPhrases.OK, null, data);
    }

    /**
     ** Format the success response of find one operation
     * @param data
     */
    public findOneSuccessResponse(data: T) : BaseResponse<T> {
        return new BaseResponse(StatusCodes.OK, ReasonPhrases.OK, null, data);
    }

    /**
     ** Format the success response of update operation
     * @param data
     */
    public updateSuccessResponse(data: T) : BaseResponse<T> {
        return new BaseResponse(StatusCodes.OK, ReasonPhrases.OK, null, data);
    }

    /**
     ** Format the success response of delete operation
     * @param data
     */
    public deleteSuccessResponse(data: T) : BaseResponse<T> {
        return new BaseResponse(StatusCodes.OK, ReasonPhrases.OK, null, data);
    }

    /**
     * 
     */
    public pagingSuccessResponse(data: Page<T>, requestPageable : RequestPageable) : BaseResponse<PagingResponse<T>> {
        const result = new PagingResponse<T>(data.totalElements, data.content, requestPageable);
        return new BaseResponse<PagingResponse<T>>(StatusCodes.OK, ReasonPhrases.OK, null, result);
    }
}

export default ResponseGenerator;