//  This file is part of MinIO Console Server
//  Copyright (c) 2022 MinIO, Inc.
//
//  This program is free software: you can redistribute it and/or modify
//  it under the terms of the GNU Affero General Public License as published by
//  the Free Software Foundation, either version 3 of the License, or
//  (at your option) any later version.
//
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU Affero General Public License for more details.
//
//  You should have received a copy of the GNU Affero General Public License
//  along with this program.  If not, see <http://www.gnu.org/licenses/>.

import React from "react";
import { IMenuItem } from "./Menu/types";
import {
  adminUserPermissions,
  CONSOLE_UI_RESOURCE,
  IAM_PAGES,
  IAM_PAGES_PERMISSIONS,
  IAM_SCOPES,
  S3_ALL_RESOURCES,
} from "../../common/SecureComponent/permissions";
import {
  EyeIcon,
  LogInIcon,
  LockOpenIcon,
  LambdaIcon,
  FileIcon,
} from "mds";
import { hasPermission } from "../../common/SecureComponent";
import EncryptionIcon from "../../icons/SidebarMenus/EncryptionIcon";
import EncryptionStatusIcon from "../../icons/SidebarMenus/EncryptionStatusIcon";

const permissionsValidation = (item: IMenuItem) => {
  return (
    ((item.customPermissionFnc
      ? item.customPermissionFnc()
      : hasPermission(
          CONSOLE_UI_RESOURCE,
          IAM_PAGES_PERMISSIONS[item.path ?? ""],
        )) ||
      item.forceDisplay) &&
    !item.fsHidden
  );
};

const validateItem = (item: IMenuItem) => {
  // We clean up child items first
  if (item.children && item.children.length > 0) {
    const childArray: IMenuItem[] = item.children.reduce(
      (acc: IMenuItem[], item) => {
        if (!validateItem(item)) {
          return [...acc];
        }

        return [...acc, item];
      },
      [],
    );

    const ret = { ...item, children: childArray };

    return ret;
  }

  if (permissionsValidation(item)) {
    return item;
  }

  return false;
};

export const validRoutes = (
  features: string[] | null | undefined,
  licenseNotification: boolean = false,
) => {
  const ldapIsEnabled = (features && features.includes("ldap-idp")) || false;
  const kmsIsEnabled = (features && features.includes("kms")) || false;

  let consoleMenus: IMenuItem[] = [
    {
      group: "User",
      name: "Object Browser",
      id: "object-browser",
      path: IAM_PAGES.OBJECT_BROWSER_VIEW,
      icon: <EyeIcon />, // Replaced undefined ObjectBrowserIcon
      forceDisplay: true,
    },
    {
      group: "User",
      id: "nav-accesskeys",
      path: IAM_PAGES.ACCOUNT,
      name: "Access Keys",
      icon: <EyeIcon />,
      forceDisplay: true,
    },
    {
      group: "User",
      path: "https://min.io/docs/minio/linux/index.html?ref=con",
      name: "Documentation",
      icon: <EyeIcon />, // Replaced undefined DocumentationIcon
      forceDisplay: true,
    },
    {
      group: "Administrator",
      name: "Buckets",
      id: "buckets",
      path: IAM_PAGES.BUCKETS,
      icon: <EyeIcon />,
      forceDisplay: true,
    },
    {
      group: "Administrator",
      name: "Policies",
      id: "policies",
      path: IAM_PAGES.POLICIES,
      icon: <EyeIcon />,
    },
    {
      group: "Administrator",
      name: "Identity",
      id: "identity",
      icon: <EyeIcon />,
      children: [
        {
          id: "users",
          path: IAM_PAGES.USERS,
          customPermissionFnc: () =>
            hasPermission(CONSOLE_UI_RESOURCE, adminUserPermissions) ||
            hasPermission(S3_ALL_RESOURCES, adminUserPermissions) ||
            hasPermission(CONSOLE_UI_RESOURCE, [IAM_SCOPES.ADMIN_ALL_ACTIONS]),
          name: "Users",
          icon: <EyeIcon />,
          fsHidden: ldapIsEnabled,
        },
        {
          id: "groups",
          path: IAM_PAGES.GROUPS,
          name: "Groups",
          icon: <EyeIcon />,
          fsHidden: ldapIsEnabled,
        },
        {
          name: "OpenID",
          id: "openID",
          path: IAM_PAGES.IDP_OPENID_CONFIGURATIONS,
          icon: <LockOpenIcon />,
        },
        {
          name: "LDAP",
          id: "ldap",
          path: IAM_PAGES.IDP_LDAP_CONFIGURATIONS,
          icon: <LogInIcon />,
        },
      ],
    },
    {
      group: "Administrator",
      name: "Monitoring",
      id: "tools",
      icon: <EyeIcon />,
      children: [
        {
          name: "Metrics",
          id: "monitorMetrics",
          path: IAM_PAGES.DASHBOARD,
          icon: <EyeIcon />,
        },
        {
          name: "Logs ",
          id: "monitorLogs",
          path: IAM_PAGES.TOOLS_LOGS,
          icon: <EyeIcon />,
        },
        {
          name: "Audit",
          id: "monitorAudit",
          path: IAM_PAGES.TOOLS_AUDITLOGS,
          icon: <EyeIcon />,
        },
        {
          name: "Trace",
          id: "monitorTrace",
          path: IAM_PAGES.TOOLS_TRACE,
          icon: <EyeIcon />,
        },
        {
          name: "Watch",
          id: "monitorWatch",
          icon: <EyeIcon />,
          path: IAM_PAGES.TOOLS_WATCH,
        },
        {
          name: "Encryption",
          id: "monitorEncryption",
          path: IAM_PAGES.KMS_STATUS,
          icon: <EncryptionStatusIcon />,
          fsHidden: !kmsIsEnabled,
        },
      ],
    },
    {
      group: "Administrator",
      path: IAM_PAGES.EVENT_DESTINATIONS,
      name: "Events",
      icon: <LambdaIcon />,
      id: "lambda",
    },
    {
      group: "Administrator",
      path: IAM_PAGES.TIERS,
      name: "Tiering",
      icon: <EyeIcon />,
      id: "tiers",
    },
    {
      group: "Administrator",
      path: IAM_PAGES.SITE_REPLICATION,
      name: "Site Replication",
      icon: <FileIcon />,
      id: "sitereplication",
    },
    {
      group: "Administrator",
      path: IAM_PAGES.KMS_KEYS,
      name: "Encryption",
      icon: <EncryptionIcon />,
      id: "encryption",
      fsHidden: !kmsIsEnabled,
    },
    {
      group: "Administrator",
      path: IAM_PAGES.SETTINGS,
      name: "Configuration",
      id: "configurations",
      icon: <EyeIcon />,
    },
    {
      group: "Subnet",
      path: IAM_PAGES.LICENSE,
      name: "License",
      id: "license",
      icon: <EyeIcon />, // Replaced undefined LicenseIcon
      badge: licenseNotification,
      forceDisplay: true,
    },
    {
      group: "Subnet",
      name: "Health",
      id: "diagnostics",
      icon: <EyeIcon />,
      path: IAM_PAGES.TOOLS_DIAGNOSTICS,
    },
    {
      group: "Subnet",
      name: "Performance",
      id: "performance",
      icon: <EyeIcon />,
      path: IAM_PAGES.TOOLS_SPEEDTEST,
    },
    {
      group: "Subnet",
      name: "Profile",
      id: "profile",
      icon: <EyeIcon />,
      path: IAM_PAGES.PROFILE,
    },
    {
      group: "Subnet",
      name: "Inspect",
      id: "inspectObjects",
      path: IAM_PAGES.SUPPORT_INSPECT,
      icon: <EyeIcon />,
    },
    {
      group: "Subnet",
      name: "Call Home",
      id: "callhome",
      icon: <EyeIcon />,
      path: IAM_PAGES.CALL_HOME,
    },
  ];

  return consoleMenus.reduce((acc: IMenuItem[], item) => {
    const validation = validateItem(item);
    if (!validation) {
      return [...acc];
    }

    return [...acc, validation];
  }, []);
};
