<<<<<<< HEAD:src/components/ui/avatar.tsx
import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"
=======
<<<<<<< HEAD
"use client";

import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as React from "react";
import { cn } from "../lib/utils";
=======
import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"
>>>>>>> 0ddf930d (Implement Room List View)
>>>>>>> e92c883a (Implement Room List View):src/utils/avatar.tsx

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
<<<<<<< HEAD:src/components/ui/avatar.tsx
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName
=======
<<<<<<< HEAD
      className,
    )}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;
=======
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName
>>>>>>> 0ddf930d (Implement Room List View)
>>>>>>> e92c883a (Implement Room List View):src/utils/avatar.tsx

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
<<<<<<< HEAD:src/components/ui/avatar.tsx
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName
=======
<<<<<<< HEAD
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
=======
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName
>>>>>>> 0ddf930d (Implement Room List View)
>>>>>>> e92c883a (Implement Room List View):src/utils/avatar.tsx

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
<<<<<<< HEAD:src/components/ui/avatar.tsx
      className
=======
<<<<<<< HEAD
      className,
>>>>>>> e92c883a (Implement Room List View):src/utils/avatar.tsx
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

<<<<<<< HEAD:src/components/ui/avatar.tsx
export { Avatar, AvatarImage, AvatarFallback }
=======
export { Avatar, AvatarImage, AvatarFallback };
=======
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
>>>>>>> 0ddf930d (Implement Room List View)
>>>>>>> e92c883a (Implement Room List View):src/utils/avatar.tsx
