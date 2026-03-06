// This file is part of MinIO Console Server
// Copyright (c) 2021 MinIO, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import React from "react";

import {
  FileIcon,
  EyeIcon,
} from "mds";
import IconWithLabel from "./IconWithLabel";


interface IExtToIcon {
  icon: any;
  extensions: string[];
}

export const extensionToIcon: IExtToIcon[] = [
  {
    icon: <FileIcon />,
    extensions: ["mp4", "mov", "avi", "mpeg", "mpg", "mp3", "m4a", "aac", "cer", "crt", "pem", "html", "xml", "css", "py", "go", "php", "cpp", "h", "java", "sql", "jpeg", "jpg", "gif", "tiff", "png", "heic", "dng"],
  },
  {
    icon: <EyeIcon />,
    extensions: ["pdf", "ppt", "pptx", "xls", "xlsx", "cfg", "yaml", "ttf", "otf", "doc", "docx", "txt", "rtf", "zip", "rar", "tar", "gz", "epub", "mobi", "azw", "azw3"],
  },
];

export const displayFileIconName = (
  element: string,
  returnOnlyIcon: boolean = false,
) => {
  let elementString = element;
  let icon = <FileIcon />;
  // Element is a folder
  if (element.endsWith("/")) {
    icon = <FileIcon />;
    elementString = element.slice(0, -1);
  }

  const lowercaseElement = element.toLowerCase();
  for (const etc of extensionToIcon) {
    for (const ext of etc.extensions) {
      if (lowercaseElement.endsWith(`.${ext}`)) {
        icon = etc.icon;
      }
    }
  }

  if (!element.endsWith("/") && element.indexOf(".") < 0) {
    icon = <FileIcon />;
  }

  const splitItem = elementString.split("/");

  if (returnOnlyIcon) {
    return icon;
  }

  return <IconWithLabel icon={icon} strings={splitItem} />;
};
