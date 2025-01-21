declare module "react-notifications" {
    import React from "react";
  
    export type NotificationType = "info" | "success" | "warning" | "error";
  
    export interface NotificationOptions {
      title?: string;
      message?: string;
      timeOut?: number;
      onClick?: () => void;
      priority?: boolean;
    }
  
    export class NotificationManager {
      static create(
        type: NotificationType,
        title: string,
        message: string,
        timeOut?: number,
        onClick?: () => void,
        priority?: boolean
      ): void;
      static info(message: string, title?: string, timeOut?: number, onClick?: () => void): void;
      static success(message: string, title?: string, timeOut?: number, onClick?: () => void): void;
      static warning(message: string, title?: string, timeOut?: number, onClick?: () => void): void;
      static error(message: string, title?: string, timeOut?: number, onClick?: () => void): void;
    }
  
    export const NotificationContainer: React.FC;
  }
  