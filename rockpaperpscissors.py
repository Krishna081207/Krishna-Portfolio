import tkinter as tk
import random
import os
import sys

# try import Pillow for JPG support / resizing
try:
    from PIL import Image, ImageTk
    PIL_AVAILABLE = True
except Exception:
    PIL_AVAILABLE = False

# --- Main Window ---
root = tk.Tk()
root.title("Rock Paper Scissors")
root.geometry("400x560")
root.config(bg="#1e1e2f")

# --- Game Variables ---
choices = ["Rock", "Paper", "Scissors"]

# --- Score Variables ---
player_score = 0
comp_score = 0
draws = 0

# --- Load images (use JPG/PNG/GIF; files can be named rock/paper/scissors with common ext) ---
images = {}
# ensure absolute folder containing this script
try:
    images_dir = os.path.abspath(os.path.dirname(__file__))
except NameError:
    images_dir = os.getcwd()

file_bases = {"Rock": "rock", "Paper": "paper", "Scissors": "scissors"}
exts = [".jpg", ".jpeg", ".png", ".gif"]

for name, base in file_bases.items():
    found = None
    found_ext = None
    for ext in exts:
        candidate = os.path.join(images_dir, base + ext)
        if os.path.exists(candidate):
            found = candidate
            found_ext = ext.lower()
            break

    if not found:
        images[name] = None
        continue

    # If Pillow is available, use it for all formats and resize cleanly
    if PIL_AVAILABLE:
        try:
            img = Image.open(found).convert("RGBA")
            img = img.resize((80, 80), Image.LANCZOS)
            images[name] = ImageTk.PhotoImage(img)
        except Exception:
            images[name] = None
    else:
        # tkinter.PhotoImage supports PNG/GIF only; JPG/JPEG require Pillow
        if found_ext in (".png", ".gif"):
            try:
                images[name] = tk.PhotoImage(file=found)
            except Exception:
                images[name] = None
        else:
            # JPG detected but Pillow not installed -> cannot load
            images[name] = None
            print(f"[warning] {os.path.basename(found)} detected but Pillow not installed; install with: pip install pillow", file=sys.stderr)

# --- Labels ---
title = tk.Label(root, text="Rock Paper Scissors", font=("Arial", 20, "bold"), bg="#1e1e2f", fg="white")
title.pack(pady=12)

# --- Score Display ---
score_frame = tk.Frame(root, bg="#1e1e2f")
score_frame.pack(pady=(0, 8))

player_score_label = tk.Label(score_frame, text=f"You: {player_score}", font=("Arial", 12, "bold"), bg="#1e1e2f", fg="#00ff88")
player_score_label.pack(side="left", padx=10)

comp_score_label = tk.Label(score_frame, text=f"Computer: {comp_score}", font=("Arial", 12, "bold"), bg="#1e1e2f", fg="#ff3355")
comp_score_label.pack(side="left", padx=10)

draws_label = tk.Label(score_frame, text=f"Draws: {draws}", font=("Arial", 12, "bold"), bg="#1e1e2f", fg="white")
draws_label.pack(side="left", padx=10)

# --- Centered choices area ---
choices_frame = tk.Frame(root, bg="#1e1e2f")
choices_frame.pack(pady=12)  # keep a margin between center and buttons below

# Player side
player_frame = tk.Frame(choices_frame, bg="#1e1e2f")
player_frame.pack(side="left", padx=18)
player_label = tk.Label(player_frame, text="You", font=("Arial", 14), bg="#1e1e2f", fg="white")
player_label.pack()
player_choice = tk.Label(player_frame, text="", font=("Arial", 24, "bold"), bg="#1e1e2f", fg="#00ff88")
player_choice.pack(pady=6)

# VS label
vs_label = tk.Label(choices_frame, text="VS", font=("Arial", 16, "bold"), bg="#1e1e2f", fg="white")
vs_label.pack(side="left", padx=8)

# Computer side
comp_frame = tk.Frame(choices_frame, bg="#1e1e2f")
comp_frame.pack(side="left", padx=18)
comp_label = tk.Label(comp_frame, text="Computer", font=("Arial", 14), bg="#1e1e2f", fg="white")
comp_label.pack()
comp_choice = tk.Label(comp_frame, text="", font=("Arial", 24, "bold"), bg="#1e1e2f", fg="#ff3355")
comp_choice.pack(pady=6)

# Result label centered under choices
result_label = tk.Label(root, text="", font=("Arial", 18, "bold"), bg="#1e1e2f", fg="white")
result_label.pack(pady=6)

# --- Temporary image display row (below the centered area) ---
display_frame = tk.Frame(root, bg="#1e1e2f")
display_frame.pack(pady=(6, 10))
display_left = tk.Label(display_frame, text="", bg="#1e1e2f")
display_left.pack(side="left", padx=40)
display_right = tk.Label(display_frame, text="", bg="#1e1e2f")
display_right.pack(side="left", padx=40)

# --- Symbol row (optional) ---
symbol_frame = tk.Frame(root, bg="#1e1e2f")
symbol_frame.pack(pady=(4, 6))
symbol_images = {}
for key, base in file_bases.items():
    found_path = None
    for ext in exts:
        candidate = os.path.join(images_dir, base + ext)
        if os.path.exists(candidate):
            found_path = candidate
            break
    if found_path and PIL_AVAILABLE:
        try:
            img = Image.open(found_path).convert("RGBA")
            img = img.resize((36, 36), Image.LANCZOS)
            symbol_images[key] = ImageTk.PhotoImage(img)
            continue
        except Exception:
            pass
    symbol_images[key] = images.get(key)

for c in choices:
    img = symbol_images.get(c)
    if img:
        lbl = tk.Label(symbol_frame, image=img, bg="#1e1e2f")
        lbl.image = img
    else:
        lbl = tk.Label(symbol_frame, text=c, font=("Arial", 12), bg="#1e1e2f", fg="white")
    lbl.pack(side="left", padx=28)

# --- Animation Function (now shows images in display_frame for a while) ---
def animate_result(p_choice, c_choice, result, winner):
    countdown = ["3...", "2...", "1..."]

    def do_count(i=0):
        if i < len(countdown):
            result_label.config(text=countdown[i])
            root.after(350, lambda: do_count(i + 1))
        else:
            # show choices in center labels immediately
            if images.get(p_choice):
                player_choice.config(image=images[p_choice], text="")
                player_choice.image = images[p_choice]
            else:
                player_choice.config(image="", text=p_choice)
                player_choice.image = None

            if images.get(c_choice):
                comp_choice.config(image=images[c_choice], text="")
                comp_choice.image = images[c_choice]
            else:
                comp_choice.config(image="", text=c_choice)
                comp_choice.image = None

            # also display the same images in the temporary display row below center
            if images.get(p_choice):
                display_left.config(image=images[p_choice], text="")
                display_left.image = images[p_choice]
            else:
                display_left.config(image="", text=p_choice)
                display_left.image = None

            if images.get(c_choice):
                display_right.config(image=images[c_choice], text="")
                display_right.image = images[c_choice]
            else:
                display_right.config(image="", text=c_choice)
                display_right.image = None

            result_label.config(text="")  # clear countdown

            # keep the display images visible for 2 seconds, then finalize score and clear temp display
            def finalize():
                global player_score, comp_score, draws
                if winner == "player":
                    player_score += 1
                    player_score_label.config(text=f"You: {player_score}")
                elif winner == "comp":
                    comp_score += 1
                    comp_score_label.config(text=f"Computer: {comp_score}")
                else:
                    draws += 1
                    draws_label.config(text=f"Draws: {draws}")
                # show result text after score update
                result_label.config(text=result)
                # clear the temporary display after showing score/result
                root.after(1000, clear_temp_display)

            def clear_temp_display():
                display_left.config(image="", text="")
                display_left.image = None
                display_right.config(image="", text="")
                display_right.image = None

            root.after(2000, finalize)

    do_count()

# --- Game Logic ---
def play(choice):
    # clear previous text/image in main center (keep temporary display cleared too)
    player_choice.config(text="", image="")
    player_choice.image = None
    comp_choice.config(text="", image="")
    comp_choice.image = None
    display_left.config(text="", image="")
    display_left.image = None
    display_right.config(text="", image="")
    display_right.image = None
    result_label.config(text="")

    computer = random.choice(choices)
    # determine winner but DO NOT update scores yet
    if choice == computer:
        result = "It's a Draw!"
        winner = "draw"
    elif (choice == "Rock" and computer == "Scissors") or \
         (choice == "Paper" and computer == "Rock") or \
         (choice == "Scissors" and computer == "Paper"):
        result = "You Win!"
        winner = "player"
    else:
        result = "Computer Wins!"
        winner = "comp"

    # start animation; score will be applied after animation + 2s display
    root.after(100, lambda: animate_result(choice, computer, result, winner))

# --- Bottom area for action buttons (buttons placed at the bottom of the window) ---
bottom_frame = tk.Frame(root, bg="#1e1e2f")
bottom_frame.pack(side="bottom", fill="x", pady=10)

# Buttons (Play choices) placed above control buttons but inside bottom area
btn_frame = tk.Frame(bottom_frame, bg="#1e1e2f")
btn_frame.pack(pady=(0, 8))

for c in choices:
    btn = tk.Button(
        btn_frame, text=c, font=("Arial", 14, "bold"),
        width=10, bg="#333", fg="white", activebackground="#00ff88",
        command=lambda c=c: play(c)
    )
    btn.pack(side="left", padx=6)

# Control Buttons: Restart and Exit (bottommost)
control_frame = tk.Frame(bottom_frame, bg="#1e1e2f")
control_frame.pack()

def reset_game():
    global player_score, comp_score, draws
    player_score = 0
    comp_score = 0
    draws = 0
    player_score_label.config(text=f"You: {player_score}")
    comp_score_label.config(text=f"Computer: {comp_score}")
    draws_label.config(text=f"Draws: {draws}")
    # clear displayed choices/result
    player_choice.config(text="", image="")
    player_choice.image = None
    comp_choice.config(text="", image="")
    comp_choice.image = None
    result_label.config(text="")
    display_left.config(text="", image="")
    display_left.image = None
    display_right.config(text="", image="")
    display_right.image = None

restart_btn = tk.Button(control_frame, text="Restart", font=("Arial", 12, "bold"), width=10,
                        bg="#444", fg="white", command=reset_game)
restart_btn.pack(side="left", padx=10)

exit_btn = tk.Button(control_frame, text="Exit", font=("Arial", 12, "bold"), width=10,
                     bg="#660000", fg="white", command=root.destroy)
exit_btn.pack(side="left", padx=10)

root.mainloop()
