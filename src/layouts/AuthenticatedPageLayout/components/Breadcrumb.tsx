import { ChevronRightIcon } from "@chakra-ui/icons";
import { Breadcrumb as BreadcrumbChakra, BreadcrumbItem, BreadcrumbLink, HStack } from "@chakra-ui/react";
import { useMatches, useNavigate } from "react-router-dom";
import { BreadcrumbRoute } from "../../../@types/react-base-props";

export function Breadcrumb() {
  const navigate = useNavigate();
  const matches = useMatches() as BreadcrumbRoute[];
  const crumbs = matches
    .filter((match) => Boolean(match.handle?.title))

  return (
    <HStack
      minH={8}
      py={4}
      pl={8}
      w={"full"}
      bg={"blue.600"}
      boxShadow={"lg"}
      textColor={"white"}
    >
      {
        crumbs.length <= 3 ?
          <>
            <BreadcrumbChakra spacing='8px' separator={<ChevronRightIcon />} >
              {crumbs.map((crumb, index) => {
                const currentPage = crumbs.length - 1 === index
                const textDecoration = !currentPage ? 'underline' : '';

                return (
                  <BreadcrumbItem key={index} isCurrentPage={currentPage}>
                    <BreadcrumbLink onClick={() => navigate(crumb.pathname)} textDecoration={textDecoration}>
                      {crumb.handle.title}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                );
              })}
            </BreadcrumbChakra>
          </> : <>
            <BreadcrumbChakra spacing='4px' separator={<ChevronRightIcon />} >
              <BreadcrumbItem isCurrentPage={false}>
                <BreadcrumbLink onClick={() => navigate(crumbs[0].pathname)} textDecoration={"underline"}>
                  {crumbs[0].handle.title}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink onClick={() => navigate(crumbs[0].pathname)} textDecoration={"underline"}>
                  ...
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem isCurrentPage={true}>
                <BreadcrumbLink onClick={() => navigate(crumbs[crumbs.length - 1].pathname)}>
                  {crumbs[crumbs.length - 1].handle.title}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbChakra>
          </>
      }
    </HStack>
  )
}
