import { Page } from "@/types/Page.type";
import { convertToDto } from "@/utils/dto-convert/convert-to-dto";
import { ClassConstructor, plainToInstance } from "class-transformer";

export function convertToPageDto<DTO_TYPE>(DTO: ClassConstructor<DTO_TYPE>, data: Page<any>) {
    const convertedResult: Page<DTO_TYPE> = {
        totalElements: data.totalElements,
        content: data.content.map((item: any) =>
            plainToInstance(DTO, item, { excludeExtraneousValues: true })
        ),
      };
      return convertedResult;
}