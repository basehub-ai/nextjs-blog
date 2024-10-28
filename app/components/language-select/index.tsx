import * as React from "react";

import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
import { Pump } from "basehub/react-pump";
import type { LanguagesEnum } from "@/.basehub/schema";
import { ClientSelectRoot } from "./client";

export function LanguageSelect({ locale }: { locale: LanguagesEnum }) {
  return (
    <Pump
      queries={[
        {
          sets: {
            languages: {
              variants: {
                apiName: true,
                id: true,
                label: true,
              },
            },
          },
        },
      ]}
    >
      {async ([
        {
          sets: { languages },
        },
      ]) => {
        "use server";
        return (
          <ClientSelectRoot defaultValue={locale}>
            <SelectTrigger className="ml-auto w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {languages.variants.map((language) => (
                  <SelectItem key={language.id} value={language.apiName}>
                    {language.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </ClientSelectRoot>
        );
      }}
    </Pump>
  );
}
