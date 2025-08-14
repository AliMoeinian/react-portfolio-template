import React, { useEffect, useMemo, useRef, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import LightModeIcon from "@mui/icons-material/LightMode";
import List from "@mui/material/List";
import ListIcon from "@mui/icons-material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";

type Mode = "light" | "dark";

const drawerWidth = 240;

// ترتیب منو — Skills اضافه شد
const navItems: [label: string, id: string][] = [
  ["Expertise", "expertise"],
  ["Skills", "skills"],
  ["History", "history"],
  ["Projects", "projects"],
  ["Publications", "publications"],
  ["Achievements", "achievements"],
  ["Mentoring", "mentoring"],
  ["Education", "education"],
  ["Contact", "contact"],
];

interface NavigationProps {
  parentToChild: { mode: Mode };
  modeChange: () => void;
}

function Navigation({ parentToChild, modeChange }: NavigationProps) {
  const { mode } = parentToChild;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>(navItems[0][1]);
  const appbarRef = useRef<HTMLDivElement | null>(null);

  const sectionIds = useMemo(() => navItems.map(([, id]) => id), []);

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

  // ارتفاع نوار ناوبری (برای offset اسکرول)
  const getNavHeight = () => {
    const el = document.getElementById("navigation");
    return el ? el.clientHeight : 0;
  };

  // اسکرول نرم به سکشن با درنظر گرفتن offset
  const scrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (!target) return;

    const navH = getNavHeight();
    const rect = target.getBoundingClientRect();
    const y = window.scrollY + rect.top - (navH + 8); // 8px فاصله‌ی تنفسی

    window.scrollTo({ top: y, behavior: "smooth" });
  };

  // تغییر استایل AppBar هنگام اسکرول
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById("navigation");
      if (navbar) setScrolled(window.scrollY > navbar.clientHeight);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // هایلایت آیتم فعال با IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // نزدیک‌ترین سکشن به بالای صفحه که حداقل 20% دیده می‌شود
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top > b.boundingClientRect.top ? 1 : -1));
        if (visible[0]) {
          const id = visible[0].target.getAttribute("id");
          if (id && sectionIds.includes(id)) setActiveId(id);
        }
      },
      {
        rootMargin: `-${getNavHeight() + 12}px 0px -60% 0px`,
        threshold: [0.2, 0.5, 0.8],
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds.join(",")]);

  // پشتیبانی از hash در بارگذاری اولیه (#skills و …)
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace("#", "");
      if (sectionIds.includes(id)) {
        // کمی صبر تا AppBar رندر شود
        setTimeout(() => scrollToSection(id), 50);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const drawer = (
    <Box
      className="navigation-bar-responsive"
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center" }}
    >
      <p className="mobile-menu-top" style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "center" }}>
        <ListIcon />
        Menu
      </p>
      <Divider />
      <List>
        {navItems.map(([label, id]) => (
          <ListItem key={label} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={() => scrollToSection(id)}
              selected={activeId === id}
            >
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        id="navigation"
        ref={appbarRef}
        className={`navbar-fixed-top${scrolled ? " scrolled" : ""}`}
      >
        <Toolbar className="navigation-bar">
          {mode === "dark" ? (
            <LightModeIcon onClick={modeChange} sx={{ cursor: "pointer", mr: 2 }} />
          ) : (
            <DarkModeIcon onClick={modeChange} sx={{ cursor: "pointer", mr: 2 }} />
          )}

          <Box sx={{ flexGrow: 1 }} />

          {/* دسکتاپ */}
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            {navItems.map(([label, id]) => (
              <Button
                key={label}
                className={`nav-link${activeId === id ? " active" : ""}`}
                onClick={() => scrollToSection(id)}
                sx={{ color: "inherit" }}
                aria-current={activeId === id ? "page" : undefined}
              >
                {label}
              </Button>
            ))}
          </Box>

          {/* موبایل */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

export default Navigation;
