import Box from "@mui/material/Box";
import Steps from "../components/landing-page/steps";
import About from "../components/landing-page/about_us";
import { ThemeProvider } from "@emotion/react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { useEffect, useRef } from "react";
import theme from "../theme";
import { useTranslation } from "react-i18next";
import { languageSelect } from "../utils/helpers";
import { Avatar, Card, Typography, Zoom } from "@mui/material";

// Define the LandingPage component
function GithubPage() {
  // Initialize internationalization function
  const { t, i18n } = useTranslation("common");

  // Call languageSelect function on component mount
  useEffect(() => {
    languageSelect(i18n);
  }, []);

  // Initialize rendering 3D model
  console.log("Rendering app");
  const imageRef = useRef(null);
  const containerRef = useRef(null);
  let createdTree = false;

  useEffect(() => {
    console.log("Ref curent", imageRef.current);
    if (!createdTree && imageRef.current !== null) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.set(0, 0, 0);
      let object;
      let controls;
      let mouseX = window.innerWidth / 2;
      let mouseY = window.innerHeight / 2;
      let objToRender = "mangotree";
      // Load 3D model using GLTF loader
      const loader = new GLTFLoader();

      loader.load(
        `/great-green/animatedModels/mangotree/scene.gltf`,
        function (gltf) {
          object = gltf.scene;

          // Set object position
          console.log("Object position", object.position);
          scene.add(object);
          animate();
        },
        function (xhr) {
          console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        function (error) {
          console.error(error);
        }
      );

      // Set up renderer and lighting
      const renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.toneMapping = THREE.LinearToneMapping;
      renderer.toneMappingExposure = 4;
      renderer.setSize(window.innerWidth, window.innerHeight);
      imageRef.current.appendChild(renderer.domElement);

      // Add lighting to the 3D model
      camera.position.z = objToRender == "mangotree" ? 80 : 80;
      const hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0xadd8e6, 1);

      const shadowLight = new THREE.DirectionalLight(0xffffff, 1);

      shadowLight.position.set(-150, 350, 350);

      shadowLight.castShadow = true;

      shadowLight.shadow.camera.left = -400;
      shadowLight.shadow.camera.right = 400;
      shadowLight.shadow.camera.top = 400;
      shadowLight.shadow.camera.bottom = -400;
      shadowLight.shadow.camera.near = 1;
      shadowLight.shadow.camera.far = 1000;

      shadowLight.shadow.mapSize.width = 2048;
      shadowLight.shadow.mapSize.height = 2048;

      scene.add(hemisphereLight);
      scene.add(shadowLight);

      if (objToRender == "mangotree") {
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableZoom = false;
        controls.enableRotate = false;
        controls.enablePan = false;
      }

      // Animate function to move the model
      function animate() {
        requestAnimationFrame(animate);
        if (object && objToRender === "mangotree") {
          object.rotation.y = -0.5 + (mouseX / window.innerWidth) * 1;
          object.rotation.x = -1.2 + (mouseY * 2.5) / window.innerHeight;
        }
        renderer.render(scene, camera);
      }

      window.addEventListener("resize", function () {
        console.log("Trigger Event");
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
      });

      document.onmousemove = (e) => {
        mouseX = e.clientX / 1;
        //mouseY = e.clientY;
      };

      animate();
      createdTree = true;
    }
  }, [imageRef.current]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        component="section"
        sx={{
          fontFamily: "Teko",
        }}
      >
        <div className="background">
          <div
            style={{
              backgroundImage: `url('/great-green/background.png')`,
              backgroundSize: "cover",
              height: "100vh",
            }}
          >
            <div id="container3d" ref={imageRef}></div>
            <div className="hp" ref={containerRef}>
              <div></div>
              <div>
                <div className="title">
                  <img src="/great-green/logowhite.png" width={100} alt="logo" />
                </div>
                <div className="info">
                  {t("landing.content.label1")}
                  <div className="info-1">{t("landing.content.label2")}</div>
                  <div className="info-2"> {t("landing.content.label3")}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Steps></Steps>
        <About></About>
        <Zoom in timeout={5000}>
        <Card sx={{width: "150px", margin: "auto", mt: "50px", mb: "80px", padding: "20px"}} elevation={2}>
          <Typography color={"primary"} textAlign={"center"}>Developed By:</Typography>
          <Avatar sx={{"margin": "auto", mt: "8px", backgroundColor: "green", cursor: "pointer"}} onClick={() => {window.location.href="https://github.com/Hitesh-Krishnappa"}} alt="Bhargav C N" src="https://avatars.githubusercontent.com/u/60913501"></Avatar>
          <Avatar sx={{"margin": "auto", mt: "12px",  backgroundColor: "green", cursor: "pointer"}} onClick={() => {window.location.href="https://github.com/glanzz"}} alt="Hitesh Krishnappa" src="https://avatars.githubusercontent.com/u/156739942">H</Avatar>
        </Card>
        </Zoom>
      </Box>
    </ThemeProvider>
  );
}

export default GithubPage;
