import {Button, MultiSelect, ThemeIcon} from "@mantine/core";
import {IconSearch} from "@tabler/icons-react";
import type {PatientProfile} from "~/types/DBTypes";
import type React from "react";

function AsignSurvey({data, search, setSearch}: {
  data: PatientProfile[],
  search: string,
  setSearch: React.Dispatch<React.SetStateAction<string>>
}) {
  return (
    <>
      <MultiSelect searchable data={data.map((i) => i.name) ?? []}
                   searchValue={search}
                   onSearchChange={setSearch}
                   rightSection={<ThemeIcon variant={"white"} color={"slate"}>
                     <IconSearch/>
                   </ThemeIcon>} mb={"md"}/>
      <Button w={"100%"}>
        Asignar
      </Button>
    </>
  )
}

export default AsignSurvey;